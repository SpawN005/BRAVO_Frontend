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
const GroupKnockout = ({ tournamentData }) => {
  const [tournamentStandings, setTournamentStandings] = useState({});
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
    </>
  );
};

export default GroupKnockout;
