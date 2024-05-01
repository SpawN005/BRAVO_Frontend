'use client'

import React, { useEffect, useState } from "react";
import Counter from "./Counter";
import matchService from "@/services/match/matchService";

const CounterStats = () => {
  const [numberOfTeams, setNumberOfTeams] = useState();
  const [numberOfTournaments, setNumberOfTournaments] = useState();
  const [countUsersWithPermissions, setCountUsersWithPermissions] = useState();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await matchService.getGeneralStats();
        setNumberOfTeams(statsData.numberOfTeams);
        setNumberOfTournaments(statsData.numberOfTournaments);
        setCountUsersWithPermissions(statsData.countUsersWithPermissions);
      } catch (error) {
        console.error("Error loading stats:", error);
      } 
    };

    fetchStats();
  }, []);

  return (
    <section>
      <div className="max-w-6xl mx-auto px-2 sm:px-6">
      <div className="relative bg-green-600 py-6 px-8 md:py-16 md:px-12" data-aos="fade-up">

          {numberOfTeams && numberOfTournaments && countUsersWithPermissions && (
            <div className="flex sm:flex-row flex-col space-y-4 mb-20 mt-10 sm:space-y-0 sm:mb-0 sm:mt-0 items-center justify-between snap-center w-full px-26  flex justify-center text-white">
              <Counter start={1} end={numberOfTeams} suffix="" >
                Teams
              </Counter>
              <Counter start={1} end={numberOfTournaments} suffix="">
                Tournaments
              </Counter>
              <Counter start={1} end={countUsersWithPermissions} suffix="">
               Organizers/Managers
              </Counter>
            </div>
          )}
      </div>
      </div>
    </section>
  );
};

export default CounterStats;
