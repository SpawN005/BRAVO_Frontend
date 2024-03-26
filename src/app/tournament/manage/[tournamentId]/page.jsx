"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import tournamentsService from "@/services/tournament/tournamentsService";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import GroupKnockout from "@/app/tournament/manage/[tournamentId]/GroupKnockout";
import GroupStage from "@/app/tournament/manage/[tournamentId]/GroupStage";
import KnockoutStage from "@/app/tournament/manage/[tournamentId]/KnockoutStage";

const Page = () => {
  const params = useParams();
  const [tournamentData, setTournamentData] = useState();
  const [loading, setLoading] = useState(true);
  const [tournamentType, setTournamentType] = useState();

  const fetchTournament = async () => {
    try {
      const tournament = await tournamentsService.getTournamentById(
        params.tournamentId,
      );
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
  }, [params.tournamentId]); // Dependency array should only include params.tournamentId

  return loading || !tournamentData ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <h1 className="mb-4 text-3xl font-bold">{tournamentData.name}</h1>
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
