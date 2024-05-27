"use client";

import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { BsCalendarWeek } from "react-icons/bs";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export const CalendarComponent = () => {
  const [selectDate, setSelectDate] = useState<Value>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleShowCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  const handleDataChange = (date: Value) => {
    setSelectDate(date);
  };

  const formatDate = (date: Value) => {
    if (date instanceof Date) {
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } else if (Array.isArray(date)) {
      const formattedStartDate =
        date[0]?.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) ?? "";
      const formattedEndDate =
        date[1]?.toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }) ?? "";
      return `${formattedStartDate} - ${formattedEndDate}`;
    }
    return "";
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4">
        <p className="font-bold text-lg text-[#EA642D]">
          {formatDate(selectDate)}
        </p>
        <button
          className="flex gap-2 bg-[#403C3D] text-[#E7E6E4] px-2 py-1 mb-2 rounded-md items-center"
          onClick={handleShowCalendar}
        >
          <BsCalendarWeek size={15} />
          Mudar data
        </button>
        {showCalendar && (
          <Calendar
            onChange={handleDataChange}
            value={selectDate || new Date()}
          />
        )}
      </div>
    </>
  );
};
