"use client";

import { motion } from "framer-motion";
import { MessageCircle, Phone } from "lucide-react";
import { useState } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { CommonPopup } from "../common/Popup";
import Typography from "../common/Typography";

const Wrapper = styled.section`
  position: relative;
  padding: 40px 24px 0;
  text-align: center;
`;

const Button = styled.button`
  font-size: 0.95rem;
  padding: 15px 25px;
  border: 0;
  border-top: 2px solid #d4af37;
  border-bottom: 2px solid #d4af37;
  border-radius: 20%;
  background: #fff;
  color: #b56b43;
  cursor: pointer;
  font-weight: 600;

  &:hover {
    background: #f9f6f5;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1rem;
  margin-bottom: 4px;
  color: #cc9a80;
`;
const Row = styled.div<{ $isFirst?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-top: ${({ $isFirst }) => ($isFirst ? "none" : "1px solid #eee")};
  line-height: 1.4;
`;
const Role = styled.span`
  width: 100px;
  font-size: 0.95rem;
  line-height: 1.4;
  color: #666;
`;

const Name = styled.span`
  flex: 1;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #333;
`;

const ContactIcons = styled.div`
  display: flex;
  gap: 12px;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #cc9a80;

    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const Group = styled.div`
  margin-top: 24px;
`;

const contactList = [
  {
    group: "신랑측 GROOM",
    people: [
      { role: "신랑", name: "한석호", phone: "010-8727-4816" },
      { role: "신랑 어머니", name: "윤명희", phone: "010-6256-4816" },
    ],
  },
  {
    group: "신부측 BRIDE",
    people: [
      { role: "신부", name: "안윤아", phone: "010-7145-9342" },
      { role: "신부 아버지", name: "안천규", phone: "010-7202-3489" },
    ],
  },
];

const ContactSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Wrapper>
          <Button onClick={() => setIsOpen(true)}>연락하기</Button>
        </Wrapper>
      </motion.div>

      <CommonPopup
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        cancelText="닫기"
      >
        <Typography size={1.3} center as="div" style={{ marginBottom: 16 }}>
          연락하기
        </Typography>
        {contactList.map(({ group, people }) => (
          <Group key={group}>
            <SectionTitle>{group}</SectionTitle>
            {people.map(({ role, name, phone }, idx) => (
              <Row key={name} $isFirst={idx === 0}>
                <Role>{role}</Role>
                <Name>{name}</Name>

                <ContactIcons>
                  <a href={`tel:${phone}`} aria-label="전화">
                    <Phone size={20} />
                  </a>
                  <a href={`sms:${phone}`} aria-label="문자">
                    <MessageCircle size={20} />
                  </a>
                </ContactIcons>
              </Row>
            ))}
          </Group>
        ))}
      </CommonPopup>
    </>
  );
};

export default ContactSection;
