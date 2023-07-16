import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComp = ({ props }) => {
  const [startDate, setStartDate] = useState("");
  const dateHandler = (date) => {
    setStartDate(date);
    props.shiftFormHandler({ target: { id: "shiftDate", value: date } });
  };
  useEffect(() => {
    if (props?.shiftDate) {
      props.shiftFormHandler({
        target: { id: "shiftDate", value: props.shiftDate },
      });
    }
  }, []);
  return (
    <div className="mb-6">
      <label className="text-glow block">Shift Date:</label>
      <DatePicker
        showIcon
        selected={startDate}
        onChange={(date) => dateHandler(date)}
        isClearable
        placeholderText="Day-Month-Year"
        dateFormat="dd/MM/yyyy"
        minDate={new Date(Date.now())}
        className="text-black text-center"
      />
    </div>
  );
};

export default DatePickerComp;
