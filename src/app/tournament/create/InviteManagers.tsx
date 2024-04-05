import { useTournamentStore } from "@/app/store/zustand";
import FormInput from "@/components/DefaultInput/FormInput";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import touramentsService from "@/services/tournament/tournamentsService";
import { useRouter } from "next/navigation";
import teamService, { getTeams } from "@/services/team/teamService";
import authService from "@/services/auth/authService";
import TeamCard from "@/components/Card/TeamCard";
import getUserFromToken from "@/utilities/getUserFromToken ";

const InviteManagers = ({ onNextStep, onPrevStep }: any) => {
  const user = getUserFromToken();
  const router = useRouter();
  const [teams, setTeams] = useState();
  const [selectedTeams, setSelectedTeams] = useState([]);
  const { tournament, updateTournament, resetTournament } =
    useTournamentStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const handleTeamSelect = (id) => {
    setSelectedTeams((prevSelectedTeams) => {
      if (prevSelectedTeams.includes(id)) {
        return prevSelectedTeams.filter((_id) => _id !== id);
      } else {
        return [...prevSelectedTeams, id];
      }
    });
  };
  const onSubmit = async (data: any) => {
    const updatedTournament = { ...tournament, ...data };
    if (updatedTournament.rules.nbTeams != selectedTeams.length) {
      alert("teams acquired are :" + updatedTournament.rules.nbTeams);
      return;
    }
    try {
      updatedTournament.teams = selectedTeams;
      const res = await touramentsService.CreateTournament(updatedTournament);

      await authService.addUserTournament(user.userId, res._id);
      router.push(`/tournament/details/${res._id}`);
      resetTournament();
    } catch (error) {
      console.error("Error creating tournament:", error);
    }
  };
  const fetchTeams = async () => {
    try {
      const teams = await teamService.getTeams();
      setTeams(teams);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };
  useEffect(() => {
    fetchTeams();
  }, []);

  const cardHeight = 128 + tournament?.rules?.nbTeams * 48;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex w-1/3 flex-col justify-center space-y-8 rounded-lg border border-slate-400 p-4 h-[${cardHeight}px]`}
    >
      <h1 className="text-2xl font-bold text-black">Invite Managers</h1>
      <h2>Teams available:</h2>
      <div className="flex flex-row flex-wrap justify-between ">
        {teams?.map((team, index) => (
          <TeamCard
            key={index}
            title={team.name}
            selected={selectedTeams.includes(team._id)}
            onSelect={handleTeamSelect}
            id={team._id}
            logo={team.logo}
          />
        ))}
      </div>
      <div className="flex w-full justify-between">
        <button
          onClick={onPrevStep}
          className="mt-2 h-12 w-20 rounded-md bg-green-500 font-semibold text-white"
        >
          Previous
        </button>
        <button
          type="submit"
          className={`mt-2 h-12 w-20 rounded-md font-semibold text-white transition-colors delay-150 duration-300 ease-in-out ${
            isValid ? "bg-green-500" : "bg-neutral-400"
          }`}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default InviteManagers;
