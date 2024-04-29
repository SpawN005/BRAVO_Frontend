"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import tournamentsService from "@/services/tournament/tournamentsService";
import Table from "@/components/Tables/TableOne";
import KnockoutStage from "./KnockoutStage";
import matchService from "@/services/match/matchService";
const GroupKnockout = ({ tournamentData }) => {
  console.log(tournamentData);
  const localStorageKey = `knockoutStage-${tournamentData._id}`;
  const [tournamentStandings, setTournamentStandings] = useState({});
  const [knockoutStage, setKnockoutStage] = useState(() => {
    const storedValue = localStorage.getItem(localStorageKey);
    return storedValue ? JSON.parse(storedValue) : false;
  });
  console.log(tournamentData.tournamentWinner);

  const finish = async () => {
    const result = await matchService.finishLeague(
      localStorage.getItem("Mytournament"),
    );
    setKnockoutStage(true);
    localStorage.setItem(localStorageKey, JSON.stringify(true));
    console.log(result);
  };
  const fetchStandings = async () => {
    try {
      const tournament = await tournamentsService.getTournamentStandings(
        tournamentData._id,
      );
      setTournamentStandings(tournament);
    } catch (error) {
      console.error("Error fetching tournament:", error);
    }
  };
  console.log(tournamentStandings);
  useEffect(() => {
    fetchStandings();
  }, []);
  return (
    <>
      <Swiper
        className="w-full"
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        <SwiperSlide className="w-full ">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2">
            {/* Iterate over the groups and render TableOne for each group */}
            {Object?.keys(tournamentStandings).map((groupName, index) => {
              const groupStandings = tournamentStandings[groupName];

              return (
                <div key={index}>
                  {groupStandings && <Table data={groupStandings} />}
                </div>
              );
            })}
          </div>
        </SwiperSlide>
        <SwiperSlide className="w-full">
          <KnockoutStage tournamentData={tournamentData} />
        </SwiperSlide>
      </Swiper>
      <div className="flex justify-end">
        {!knockoutStage && (
          <button
            onClick={finish}
            className="w-42 mt-4 flex  justify-center rounded bg-green-500  p-3 font-normal text-white hover:bg-opacity-90"
          >
            Begin Knockout Stage
          </button>
        )}
      </div>
    </>
  );
};

export default GroupKnockout;
