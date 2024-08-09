import React, { FC } from "react";
import classNames from "classnames";

export const Checkbox: FC<{
  name?: string;
  value?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addClass?: React.ReactNode;
  checked?: boolean;
}> = ({ name, onClick, onChange, addClass, checked, value }) => {
  return (
    <>
      <input
        type="checkbox"
        name={name ? name : ""}
        value={value ? value : ""}
        className={classNames(
          "mr-4 h-5 w-5 cursor-pointer rounded border-2 text-indigo-800 focus:ring-indigo-800 " +
            (addClass ? addClass : ""),
          {
            "border-gray-300": !addClass,
          },
        )}
        onClick={onClick ? onClick : undefined}
        onChange={onChange ? (e) => onChange(e) : undefined}
        checked={checked ? checked : undefined}
      />
    </>
  );
};
