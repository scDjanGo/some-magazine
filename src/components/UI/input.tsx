"use client";
import { FC, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name?: string;
  type?: string;
}

const MyInput: FC<InputProps> = ({
  name = "",
  type = "text",
  className,
  ...rest
}) => {
  return (
    <input
      className={`border-[1px] border-[#E2E8F0] w-full rounded-[8px] focus:outline-none placeholder:text-[#343D484D] ${className}`}
      type={type}
      name={name}
      id={name}
      {...rest}
    />
  );
};

export default MyInput;
