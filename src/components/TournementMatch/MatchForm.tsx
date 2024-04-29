"use client";
import React, { useEffect, useState } from "react";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import obserservice from "../../services/observer/observerService";
import refereeService from "@/services/referee/refereeService";
import StadiumService from "@/services/stadium/stadiumService";
import matchService from "@/services/match/matchService";
import { useForm } from "react-hook-form";

const MatchForm = ({ match,tournamentStartDate,tournamentFinishDate }) => {
  const [observers, setObservers] = useState([]);
  const [referees, setReferees] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [selectedObserver, setSelectedObserver] = useState("");
  const [selectedReferee, setSelectedReferee] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [selectedDate, setSelectedDate] = useState(match?.date || null); // Track selected date
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resultO = await obserservice.getObservers();
        setObservers(resultO.data);
        const resultR = await refereeService.getReferees();
        setReferees(resultR.data);
        const resultS = await StadiumService.getAllStadiums();
        setStadiums(resultS);

        
        if (match) {
          setValue("date", match.date);
          setValue("observer", match.observer);
          setValue("referee", match.referee);
          setValue("stadium", match.stadium);
          
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleDateSelectChange = (selectedValue) => {
    setSelectedDate(selectedValue); // Update selected date
    console.log("Selected Date:", selectedValue); // Add this line
  };


  const handleObserverSelectChange = (selectedValue, name) => {
    setSelectedObserver(selectedValue);
    setValue(name, selectedValue);
  };

  const handleRefereeSelectChange = (selectedValue, name) => {
    setSelectedReferee(selectedValue);
    setValue(name, selectedValue);
  };

  const handleStadiumSelectChange = (selectedValue, name) => {
    setSelectedStadium(selectedValue);
    setValue(name, selectedValue);
  };

  const onSubmit = async (data: any) => {
    try {
      console.log(data);

      await matchService.patchMatchById(match._id, data);
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  return (
    <form className="w-1/2" onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md border  border-green-500 bg-white shadow-lg dark:border-strokedark dark:bg-boxdark ">
        <div className="border-b border-stroke  py-4 dark:border-strokedark">
          <h3 className="text-center font-medium text-black dark:text-white">
            Match Details
          </h3>
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <DatePickerOne {...register("date", { defaultValue: match?.date })}
          mindate={tournamentStartDate}
          maxdate={tournamentFinishDate} 
          onSelectChange={handleDateSelectChange} // Pass the callback function
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo
            title="Observer"
            options={observers.map((observer) => ({
              label: observer.userIdentity.email,
              value: observer._id,
            }))}
            name="observer" // Name for react-hook-form
            onSelectChange={handleObserverSelectChange}
            defaultValue={match?.observer} // Set default value
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo
            title="Referee"
            options={referees.map((referee) => ({
              label: referee.userIdentity.email,
              value: referee._id,
            }))}
            name="referee" // Name for react-hook-form
            onSelectChange={handleRefereeSelectChange}
            defaultValue={match?.referee} // Set default value
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo
            title="Stadium"
            options={stadiums.map((stadium) => ({
              label: stadium.name,
              value: stadium._id,
            }))}
            name="stadium" // Name for react-hook-form
            onSelectChange={handleStadiumSelectChange}
            defaultValue={match?.stadium} // Set default value
          />
        </div>
        <div className="flex flex-col items-end gap-3.5 p-4.5">
          <button
            type="submit"
            className="mt-2 h-12 w-32 rounded-md bg-green-500 font-semibold text-white "
            style={{
              opacity: match?.status === "FINISHED" ? 0.6 : 1,
              cursor: match?.status === "FINISHED" ? "not-allowed" : "pointer",
            }}
            disabled={match?.status === "FINISHED"}
          >
            Save changes
          </button>
        </div>
      </div>
    </form>
  );
};

export default MatchForm;




