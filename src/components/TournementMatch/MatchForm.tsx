"use client";
import React, { useEffect, useState } from "react";
import SelectGroupTwo from "@/components/SelectGroup/SelectGroupTwo";
import DatePickerOne from "@/components/FormElements/DatePicker/DatePickerOne";
import DatePickerTwo from "@/components/FormElements/DatePicker/DatePickerTwo";
import obserservice from "../../services/observer/observerService";
import refereeService from "@/services/referee/refereeService";
import StadiumService from "@/services/stadium/stadiumService";
import matchService from "@/services/match/matchService";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
const MatchForm = ({ match, tournamentStartDate, tournamentFinishDate }) => {
  const router = useRouter();
  const [observers, setObservers] = useState([]);
  const [referees, setReferees] = useState([]);
  const [stadiums, setStadiums] = useState([]);
  const [selectedObserver, setSelectedObserver] = useState("");
  const [selectedReferee, setSelectedReferee] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [selectedDate, setSelectedDate] = useState(match?.date || null); // Track selected date
  let st;
  let ob;
  let ref;
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors, isValid },
  } = useForm();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (match) {
          if (match.date) {
            setValue("date", match.date);

            if (match.observer) {
              setValue("observer", match.observer);
              ob = await obserservice.getObserverById(match.observer);
              setSelectedObserver(ob.data);
              setObservers(ob.data);
            } else {
              const resultO =
                await obserservice.getObserversByDate(selectedDate);
              setObservers(resultO.data);
            }
            if (match.referee) {
              setValue("referee", match.referee);
              ref = await refereeService.getObserverById(match.referee);
              setSelectedReferee(ref.data);
              setReferees(ref.data);
            } else {
              const resultR =
                await refereeService.getRefereesByDate(selectedDate);
              setReferees(resultR.data);
            }
            if (match.stadium) {
              setValue("stadium", match.stadium);
              st = await StadiumService.getStadiumById(match.stadium);
              setSelectedStadium(st);
              setStadiums(st);
            } else {
              const resultS =
                await StadiumService.getAllStadiumsByDate(selectedDate);
              setStadiums(resultS);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDateChange = async (selectedDate) => {
    console.log("Selected Date:", selectedDate);
    setSelectedDate(selectedDate);
    const resultS = await StadiumService.getAllStadiumsByDate(selectedDate);
    setStadiums(resultS);
    const resultO = await obserservice.getObserversByDate(selectedDate);
    setObservers(resultO.data);
    const resultR = await refereeService.getRefereesByDate(selectedDate);
    setReferees(resultR.data);
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
      router.push("/tournaments/matches");
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
          <DatePickerTwo
            {...register("date", { defaultValue: match?.date })}
            mindate={tournamentStartDate}
            maxdate={tournamentFinishDate}
            onSelectChange={handleDateChange}
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo
            title="Available Observers"
            options={
              Array.isArray(observers)
                ? observers.map((observer) => ({
                    label: observer.userIdentity.firstName,
                    value: observer._id,
                  }))
                : [
                    {
                      label: observers.userIdentity.firstName,
                      value: observers._id,
                    },
                  ]
            }
            name="observer" // Name for react-hook-form
            onSelectChange={handleObserverSelectChange}
            defaultValue={selectedObserver} // Set default value
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo
            title="Available Referees"
            options={
              Array.isArray(referees)
                ? referees.map((referee) => ({
                    label: referee.userIdentity.firstName,
                    value: referee._id,
                  }))
                : [
                    {
                      label: referees.userIdentity.firstName,
                      value: referees._id,
                    },
                  ]
            }
            name="referee" // Name for react-hook-form
            onSelectChange={handleRefereeSelectChange}
            defaultValue={selectedReferee} // Set default value
          />
        </div>
        <div className="flex flex-col gap-5.5 p-6.5">
          <SelectGroupTwo
            title="Available Stadiums"
            options={
              Array.isArray(stadiums)
                ? stadiums.map((stadium) => ({
                    label: stadium.name,
                    value: stadium._id,
                  }))
                : [
                    {
                      label: stadiums.name,
                      value: stadiums._id,
                    },
                  ]
            }
            name="stadium" // Name for react-hook-form
            onSelectChange={handleStadiumSelectChange}
            defaultValue={selectedStadium} // Set default value
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
