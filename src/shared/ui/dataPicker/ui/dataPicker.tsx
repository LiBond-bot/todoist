import { FC } from "react";
import DatePicker from "react-datepicker";
import { createGlobalStyle } from "styled-components";

import "react-datepicker/dist/react-datepicker.css";

export const CustomDatePicker: FC<{
  selectDate: Date | null;
  callback: (e: Date | null) => void;
  placeholder?: string;
}> = ({ selectDate, callback, placeholder }) => {
  const DatePickerWrapperStyles = createGlobalStyle`
    .datePicker {
      width: 100%;
    }

    .datePicker input {
      width: 100%;
      background-color: transparent;
      border: none;
      outline: none;
      height: 100%;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
      background-color: #fff;
      padding: 1rem;
      border-radius: 0.375rem !important;
    }

    .datePicker .react-datepicker__input-container {
      height: 100%;
    }

    .datePicker input:focus {
      border: none;
      outline: none;
    }

    .datePicker input:focus {
      border: 2px solid #3730a3;
    }

    .react-datepicker {
      border: none !important;
    }

    .react-datepicker-popper {
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1) !important;
      border-radius: 16px;
      overflow: hidden;
    }

    .react-datepicker__header {
      background-color: #fff;
      border-bottom: none !important;
    }

    .react-datepicker__day-names>div{
      color: #fff !important;
    }

    .react-datepicker__day-names {
      background-color: #3730a3;
      margin: 10px 10px 0px 10px;
      border-radius: 6px;
    }

    .react-datepicker__day--keyboard-selected {
      background-color: #eef2ff;
    }

    .react-datepicker__day--selected {
      background-color: #3730a3;
    }

    .react-datepicker__day:hover {
      background-color: #eef2ff;
    }

    
`;

  const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Сб", "Вс"];
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  const locale = {
    localize: {
      day: (n) => days[n],
      month: (n) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };

  return (
    <>
      <DatePicker
        selected={selectDate}
        onChange={(date) => callback(date)}
        dateFormat="dd.MM.yyyy"
        wrapperClassName="datePicker"
        placeholderText={placeholder ? placeholder : "--/--/----"}
        locale={locale}
      />
      <DatePickerWrapperStyles />
    </>
  );
};
