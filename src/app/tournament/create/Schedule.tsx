import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import React from "react";

const Schedule = ({ onNextStep }: any) => {
  return (
    <form className="flex h-96 w-1/4 flex-col justify-between rounded-lg  border border-slate-300 p-6">
      <h1 className="text-3xl font-bold text-black">Schedule Tournament</h1>
      <p>Choose a date and a location for your tournament.</p>
      <DatePickerOne />

      <span className="block text-sm font-bold text-slate-700">Location</span>
      <input
        type="text"
        className=" focus:green-500 focus:outline-none 
      "
      />
    </form>
  );
};

export default Schedule;
