"use client";

import { CommonPopup } from "@/components/common/Popup";
import { saveRSVP } from "@/lib/saveRSVP";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";

// 🔐 Zod validation schema
const schema = z
  .object({
    name: z.string().min(1, "이름을 입력해주세요."),
    phone: z.string().min(1, "연락처를 입력해주세요."),
    attending: z.enum(["yes", "no"]),
    side: z.enum(["groom", "bride"]),
    count: z.coerce.number().optional(),
    message: z.string().optional(),
  })
  .refine((data) => data.attending === "no" || (data.count && data.count > 0), {
    message: "인원 수는 1명 이상이어야 합니다",
    path: ["count"],
  });

type FormData = z.infer<typeof schema>;

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

// ----------------- Styled Components -----------------

const Field = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.div`
  font-size: 0.95em;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #fff;
  appearance: none;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Error = styled.div`
  margin-top: 8px;
  color: #b56b43;
  font-size: 0.8em;
`;

const SuccessPopup = styled.div`
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #000;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  z-index: 99999;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 8px;
`;

const RadioButton = styled.label<{ checked?: boolean }>`
  flex: 1;
  text-align: center;
  font-size: 0.95rem;
  padding: 10px 16px;
  border: 1px solid #e6dfd9;
  border-radius: 12px;
  background: ${({ checked }) => (checked ? "#b5896a" : "#fff")};
  color: ${({ checked }) => (checked ? "#fff" : "#b56b43")};
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;

  input {
    display: none;
  }
`;

// ----------------- Component -----------------

const RSVPForm = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phone: "",
      attending: "yes",
      side: "groom",
      count: 1,
      message: "",
    },
  });

  const attending = useWatch({ control, name: "attending" });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("전달되었습니다");

  const onSubmit = async (data: FormData) => {
    try {
      await saveRSVP(data);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        onClose();
      }, 2000);
    } catch {
      setMessage("저장에 실패했어요 😢");
    }
  };

  return (
    <>
      <CommonPopup
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={handleSubmit(onSubmit)}
        confirmText="참석 정보 전달하기"
        cancelText="닫기"
      >
        <form>
          <Field>
            <Label>분류</Label>
            <RadioGroup>
              <RadioButton checked={watch("side") === "groom"}>
                <input type="radio" value="groom" {...register("side")} />
                신랑 한석호측
              </RadioButton>
              <RadioButton checked={watch("side") === "bride"}>
                <input type="radio" value="bride" {...register("side")} />
                신부 안윤아측
              </RadioButton>
            </RadioGroup>
            {errors.side && <Error>{errors.side.message}</Error>}
          </Field>

          <Field>
            <Label>참석</Label>
            <RadioGroup>
              <RadioButton checked={watch("attending") === "yes"}>
                <input type="radio" value="yes" {...register("attending")} />
                참석
              </RadioButton>
              <RadioButton checked={watch("attending") === "no"}>
                <input type="radio" value="no" {...register("attending")} />
                불참
              </RadioButton>
            </RadioGroup>
            {errors.attending && <Error>{errors.attending.message}</Error>}
          </Field>

          <Field>
            <Label>성함 *</Label>
            <Input
              type="text"
              placeholder="참석 대표자 성함을 입력해 주세요."
              {...register("name")}
            />
            {errors.name && <Error>{errors.name.message}</Error>}
          </Field>

          <Field>
            <Label>연락처 *</Label>
            <Input
              type="text"
              placeholder="참석 대표자 연락처를 입력해 주세요."
              {...register("phone")}
            />
            {errors.phone && <Error>{errors.phone.message}</Error>}
          </Field>

          {attending === "yes" && (
            <Field>
              <Label>동행 인원 (본인 포함)</Label>
              <Select {...register("count")}>
                {[...Array(30)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}명
                  </option>
                ))}
              </Select>
              {errors.count && <Error>{errors.count.message}</Error>}
            </Field>
          )}

          <Field>
            <Label>전달사항</Label>
            <TextArea
              placeholder="남기실 메시지를 작성해 주세요."
              {...register("message")}
            />
          </Field>
        </form>
      </CommonPopup>

      {submitted && (
        <SuccessPopup>
          <CheckCircle size={18} /> {message}
        </SuccessPopup>
      )}
    </>
  );
};

export default RSVPForm;
