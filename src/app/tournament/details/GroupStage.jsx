"use client";
import React, { useEffect, useState } from "react";
import Table from "@/components/Tables/TableOne";
import matchService from "@/services/match/matchService";
const GroupStage = ({ tournamentData }) => {
  const [winner, setWinner] = useState(false);
  console.log(tournamentData.tournamentWinner);
  const finish = async () => {
    const result = await matchService.finishLeague(
      localStorage.getItem("Mytournament"),
    );
    setWinner(true);
    console.log(result);
  };

  return (
    <>
      <Table data={tournamentData.standings} />
      <div className="flex justify-end">
        {!tournamentData.tournamentWinner && !winner && (
          <button
            onClick={finish}
            className="mt-4 flex w-40  justify-center rounded bg-red-600  p-3 font-normal text-white hover:bg-opacity-90"
          >
            Finish Tournament
          </button>
        )}
      </div>
    </>
  );
};

export default GroupStage;
