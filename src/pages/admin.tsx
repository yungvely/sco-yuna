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

const COLORS = ["#00C49F", "#FF8042"];

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
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
  flex-direction: column;
  align-items: center;
  margin-top: 4rem;
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
  const [side, setSide] = useState<"groom" | "bride">("groom");
  const [password, setPassword] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [chartType, setChartType] = useState<"pie" | "bar">("pie");
  const [showHistory, setShowHistory] = useState(false);

  const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;

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

  if (!authorized) {
    return (
      <PasswordWrapper>
        <h2>관리자 비밀번호 입력</h2>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />
        <button
          onClick={() => setAuthorized(password === ADMIN_PASSWORD)}
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
    <div style={{ padding: "2rem" }}>
      <h1>RSVP 관리자 통계</h1>

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
        <Tab active={chartType === "pie"} onClick={() => setChartType("pie")}>
          파이 차트
        </Tab>
        <Tab active={chartType === "bar"} onClick={() => setChartType("bar")}>
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
                        ? new Date(r.createdAt.seconds * 1000).toLocaleString()
                        : "-"}
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </AccordionContent>
        )}
      </Accordion>

      <h2 style={{ marginTop: "3rem" }}>📊 CloudFront 캐시 통계</h2>
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
    </div>
  );
};

export default AdminPage;
