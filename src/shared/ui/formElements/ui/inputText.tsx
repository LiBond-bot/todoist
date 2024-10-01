import React, { FC } from "react";

export const InputText: FC<{
  name: string;
  placeholder: string;
  onChange?(e?: React.ChangeEvent<HTMLInputElement>): void;
}> = ({ name, placeholder, onChange }) => {
  return (
    <>
      <input
        type="text"
        name={name}
        onChange={onChange ? (e) => onChange(e) : undefined}
        placeholder={placeholder}
        className="mr-6 block w-full rounded-md border-transparent bg-transparent bg-white p-4 leading-none placeholder-slate-400 shadow-xl focus:border-indigo-800 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-800"
      />
    </>
  );
};
