import { ChangeEventHandler, useRef } from "react";

type Props = {
  label?: string;
  placeholder: string;
  type?: string;
  change?: ChangeEventHandler<HTMLInputElement>;
  value: string;
};

export default function Input({ label, placeholder, type, change, value }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className=''>
      {label ? <div className='text-[#494949] mb-2'>{label}</div> : ""}
      <input
        ref={inputRef}
        className={`min-w-[100%]    outline-none ${
          type !== "create"
            ? "py-4 h-[47px] px-4 bg-[#FAFAFA] border-[2px] border-[#EBEBEB] rounded-xl"
            : "border-b-[2px] border-black"
        }`}
        placeholder={type !== "create" ? placeholder : ""}
        type={type !== "create" ? type : "text"}
        onChange={change}
        value={value}
      />
    </div>
  );
}
