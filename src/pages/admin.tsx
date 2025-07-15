"use client";

import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import KakaoSenderSection from "../components/Admin/KakaoSenderSection";

const COLORS = ["#00C49F", "#FF8042"];

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem 0;
`;

const Tab = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? "#eee" : "#f9f9f9")};
  border: none;
  border-radius: 9999px;
  padding: 10px 20px;
  margin: 0 4px;
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
  color: ${({ active }) => (active ? "#111" : "#aaa")};
`;

const Panel = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 2rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 2rem;
`;

const Th = styled.th`
  text-align: left;
  border-bottom: 1px solid #ccc;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #eee;
`;

const PasswordWrapper = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  padding-top: 4rem;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; // 전체 화면 높이
`;

const Summary = styled.div`
  text-align: center;
  margin-bottom: 1rem;
  font-weight: bold;
`;

const Accordion = styled.div`
  margin-top: 2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const AccordionHeader = styled.button`
  width: 100%;
  background: #f9f9f9;
  padding: 12px;
  text-align: left;
  font-weight: bold;
  border: none;
  cursor: pointer;
`;

const AccordionContent = styled.div`
  padding: 12px;
`;

const AdminPage = () => {
  const [allData, setAllData] = useState<any[]>([]);
  const [logData, setLogData] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"RSVP" | "CDN" | "Kakao">("RSVP");
  const [side, setSide] = useState<"groom" | "bride">("groom");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!authorized) return;

    const fetchData = async () => {
      const rsvpSnapshot = await getDocs(collection(db, "rsvp"));
      const logSnapshot = await getDocs(collection(db, "cloudfrontLogs"));

      const rsvpData = rsvpSnapshot.docs.map((doc) => doc.data());
      const logDocs = logSnapshot.docs
        .map((doc) => doc.data())
        .sort((a, b) => b.date.localeCompare(a.date));

      setAllData(rsvpData);
      setLogData(logDocs);
    };

    fetchData();
  }, [authorized]);

  useEffect(() => {
    const latestByName = new Map();
    for (const r of allData) {
      if (r.side === side) {
        const key = `${r.name}_${r.side}`;
        latestByName.set(key, r);
      }
    }
    setFiltered(Array.from(latestByName.values()));
  }, [side, allData]);

  const pieData = [
    {
      name: "참석",
      value: filtered
        .filter((r) => r.attending === "yes")
        .reduce((sum, r) => sum + (r.count || 1), 0),
    },
    {
      name: "불참",
      value: filtered
        .filter((r) => r.attending === "no")
        .reduce((sum, r) => sum + (r.count || 1), 0),
    },
  ];

  const totalAttendees = pieData[0]?.value || 0;

  const history = allData
    .filter((r) => r.side === side)
    .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);

  const handleLogin = async () => {
    try {
      const response = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setAuthorized(true);
      } else {
        alert("비밀번호가 틀렸습니다.");
        setPassword("");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  if (!authorized) {
    return (
      <PasswordWrapper>
        <h2>관리자 비밀번호 입력</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          style={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 16px",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
          }}
        >
          확인
        </button>
      </PasswordWrapper>
    );
  }

  return (
    <Wrapper>
      <h1>관리자 대시보드</h1>

      <TabContainer>
        {["RSVP", "CDN", "Kakao"].map((tab) => (
          <Tab
            key={tab}
            active={activeTab === tab}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>

      {activeTab === "RSVP" && (
        <Panel>
          <h2>📊 RSVP 참석자 통계</h2>

          <TabContainer>
            <Tab active={side === "groom"} onClick={() => setSide("groom")}>
              신랑측
            </Tab>
            <Tab active={side === "bride"} onClick={() => setSide("bride")}>
              신부측
            </Tab>
          </TabContainer>

          <Summary>총 참석 인원: {totalAttendees}명</Summary>

          <TabContainer>
            <Tab
              active={chartType === "pie"}
              onClick={() => setChartType("pie")}
            >
              파이 차트
            </Tab>
            <Tab
              active={chartType === "bar"}
              onClick={() => setChartType("bar")}
            >
              바 차트
            </Tab>
          </TabContainer>

          <ResponsiveContainer width="100%" height={300}>
            {chartType === "pie" ? (
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            ) : (
              <BarChart data={pieData} layout="vertical">
                <XAxis type="number" />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8">
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`bar-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
          <Accordion>
            <AccordionHeader onClick={() => setShowHistory(!showHistory)}>
              📋 제출 히스토리 {showHistory ? "▲" : "▼"}
            </AccordionHeader>
            {showHistory && (
              <AccordionContent>
                <Table>
                  <thead>
                    <tr>
                      <Th>이름</Th>
                      <Th>참석 여부</Th>
                      <Th>인원</Th>
                      <Th>메시지</Th>
                      <Th>제출 시간</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((r, i) => (
                      <tr key={i}>
                        <Td>{r.name}</Td>
                        <Td>{r.attending === "yes" ? "참석" : "불참"}</Td>
                        <Td>{r.count || 1}</Td>
                        <Td>{r.message || "-"}</Td>
                        <Td>
                          {r.createdAt?.seconds
                            ? new Date(
                                r.createdAt.seconds * 1000
                              ).toLocaleString()
                            : "-"}
                        </Td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </AccordionContent>
            )}
          </Accordion>
        </Panel>
      )}
      {activeTab === "CDN" && (
        <Panel>
          <h2>📊 CloudFront 캐시 통계</h2>
          <Table>
            <thead>
              <tr>
                <Th>날짜</Th>
                <Th>총 요청 수</Th>
                <Th>Hit</Th>
                <Th>Miss</Th>
                <Th>Hit Rate (%)</Th>
              </tr>
            </thead>
            <tbody>
              {logData.map((log, idx) => (
                <tr key={idx}>
                  <Td>{log.date}</Td>
                  <Td>{log.totalRequests}</Td>
                  <Td>{log.hit}</Td>
                  <Td>{log.miss}</Td>
                  <Td>{log.hitRate}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Panel>
      )}

      {activeTab === "Kakao" && (
        <Panel>
          <h2>카카오 메시지 발송</h2>
          <KakaoSenderSection />
        </Panel>
      )}
    </Wrapper>
  );
};

export default AdminPage;
