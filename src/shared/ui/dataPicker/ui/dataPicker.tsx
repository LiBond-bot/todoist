import { FC } from "react";
import DatePicker from "react-datepicker";
import { createGlobalStyle } from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker: FC<{
  selectDate: Date | null;
  callback: (e: Date | null) => void;
}> = ({ selectDate, callback }) => {
  const DatePickerWrapperStyles = createGlobalStyle`
    .datePicker {
      width: 100%;
    }
    .datePicker input {
      width: 100%;
      background-color: transparent;
      border: none;
      outline: none;
    }

    .datePicker input:focus {
      border: none;
      outline: none;
    }
`;
  return (
    <>
      <DatePicker
        selected={selectDate}
        onChange={(date) => callback(date)}
        dateFormat="dd.MM.yyyy"
        wrapperClassName="datePicker bg-indigo-50"
        placeholderText={"--/--/----"}
      />
      <DatePickerWrapperStyles />
    </>
  );
};
