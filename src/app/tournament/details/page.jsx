"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import tournamentsService from "@/services/tournament/tournamentsService";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import GroupKnockout from "@/app/tournament/details/GroupKnockout";
import GroupStage from "@/app/tournament/details/GroupStage";
import KnockoutStage from "@/app/tournament/details/KnockoutStage";
import Link from "next/link";

const Page = () => {
  const [tournamentData, setTournamentData] = useState();
  const [loading, setLoading] = useState(true);
  const [tournamentType, setTournamentType] = useState();
  const id = localStorage.getItem("Mytournament");
  const fetchTournament = async () => {
    try {
      const tournament = await tournamentsService.getTournamentById(id);
      setTournamentData(tournament);
      setTournamentType(tournament.rules.type);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tournament:", error);
    }
  };
  const updateTournamentData = (updatedTournamentData) => {
    setTournamentData(updatedTournamentData);
  };
  useEffect(() => {
    fetchTournament();
  }, [id]); // Dependency array should only include params.tournamentId

  return loading || !tournamentData ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <h1 className="mb-4 text-3xl font-bold">{tournamentData.name}</h1>
      <div className="inline-flex rounded-md shadow-sm">
        <Link
          href="/tournaments/matches"
          className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
        >
          Matches
        </Link>
        <Link
          href={`/tournament/details`}
          className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
        >
          Standings
        </Link>
      </div>
      {tournamentType === "GROUP_KNOCKOUT" && (
        <GroupKnockout
          tournamentData={tournamentData}
          onTournamentDataChange={updateTournamentData}
        />
      )}

      {tournamentType === "LEAGUE" && (
        <GroupStage tournamentData={tournamentData} />
      )}

      {tournamentType === "KNOCKOUT" && (
        <KnockoutStage tournamentData={tournamentData} />
      )}
    </DefaultLayout>
  );
};

export default Page;
