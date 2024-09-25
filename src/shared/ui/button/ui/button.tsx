import React, { FC } from "react";

export const Button: FC<{
  name: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}> = ({ name, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="w-52 rounded-lg bg-indigo-800 px-4 py-4 leading-none text-white shadow-xl"
      >
        {name}
      </button>
    </>
  );
};
