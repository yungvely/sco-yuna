// src/components/RSVP/RSVPForm.tsx
"use client";

import { saveRSVP } from "@/lib/saveRSVP";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";

const schema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요"),
    attending: z.enum(["yes", "no"], {
      errorMap: () => ({ message: "참석 여부를 선택해주세요" }),
    }),
    side: z.enum(["groom", "bride"], {
      errorMap: () => ({ message: "신랑/신부 측을 선택해주세요" }),
    }),
    count: z.coerce.number().optional(),
    message: z.string().optional(),
    agree: z.boolean().refine((val) => val === true, {
      message: "개인정보 수집에 동의해주세요",
    }),
  })
  .refine((data) => data.attending === "no" || (data.count && data.count > 0), {
    message: "인원 수는 1명 이상이어야 합니다",
    path: ["count"],
  });

type FormData = z.infer<typeof schema>;

const Wrapper = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  background: #fff;
  border-radius: 16px 16px 0 0;
  padding: 24px;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.1);
  z-index: 998;
`;

const Close = styled.button`
  position: absolute;
  top: 12px;
  right: 16px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  min-height: 80px;
`;

const Button = styled.button`
  background: #000;
  color: #fff;
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

const SuccessPopup = styled(motion.div)`
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6699;
  z-index: 999;
`;

type Props = {
  onClose: () => void;
};

const RSVPForm = ({ onClose }: Props) => {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      attending: undefined,
      side: undefined,
      message: "",
      count: 1,
      agree: false,
    },
  });

  const attending = useWatch({ control, name: "attending" });

  const onSubmit = async (data: FormData) => {
    try {
      await saveRSVP(data);
      setSubmitted(true);
    } catch (e) {
      alert("저장에 실패했어요 😢");
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [submitted, onClose]);

  return (
    <>
      <AnimatePresence>
        <Wrapper
          key="form"
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Close onClick={onClose}>&times;</Close>

          {!submitted && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Field>
                <Label>참석 여부 *</Label>
                <label>
                  <input type="radio" value="yes" {...register("attending")} />{" "}
                  참석
                </label>
                &nbsp;&nbsp;
                <label>
                  <input type="radio" value="no" {...register("attending")} />{" "}
                  불참
                </label>
                {errors.attending && <div>{errors.attending.message}</div>}
              </Field>

              <Field>
                <Label>이름 *</Label>
                <Input type="text" {...register("name")} />
                {errors.name && <div>{errors.name.message}</div>}
              </Field>

              <Field>
                <Label>신랑/신부 측 *</Label>
                <label>
                  <input type="radio" value="groom" {...register("side")} />{" "}
                  신랑 측
                </label>
                &nbsp;&nbsp;
                <label>
                  <input type="radio" value="bride" {...register("side")} />{" "}
                  신부 측
                </label>
                {errors.side && <div>{errors.side.message}</div>}
              </Field>

              {attending === "yes" && (
                <Field>
                  <Label>인원 수 *</Label>
                  <Input type="number" {...register("count")} />
                  {errors.count && <div>{errors.count.message}</div>}
                </Field>
              )}

              <Field>
                <Label>축하 메시지 (선택)</Label>
                <TextArea {...register("message")} />
              </Field>

              <Field>
                <label>
                  <input type="checkbox" {...register("agree")} /> 개인정보 수집
                  동의 *
                </label>
                {errors.agree && <div>{errors.agree.message}</div>}
              </Field>

              <Button type="submit">제출하기</Button>
            </form>
          )}
        </Wrapper>
      </AnimatePresence>

      <AnimatePresence>
        {submitted && (
          <SuccessPopup
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            💌 참석 의사 감사합니다!
            <br />
            행복한 날을 함께해요 💐
          </SuccessPopup>
        )}
      </AnimatePresence>
    </>
  );
};

export default RSVPForm;
