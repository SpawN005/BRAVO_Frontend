"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MatchDetails from "@/components/TournementMatch/MatchDetails";
import MatchForm from "@/components/TournementMatch/MatchForm";
import { useParams } from "next/navigation";
import matchService from "@/services/match/matchService";
import { useEffect, useState } from "react";
import teamService from "@/services/team/teamService";

const Matches = () => {
  const [match, setMatch] = useState();
  const [team1, setTeam1] = useState();
  const [team2, setTeam2] = useState();

  const params = useParams();
  const fetchMatch = async () => {
    try {
      const matchdata = await matchService.getMatchesById(params.MatchId);
      setMatch(matchdata);
      if (matchdata.team1) {
        const team1data = await teamService.getTeamById(matchdata.team1);
        setTeam1(team1data);
      }
      if (matchdata.team2) {
        const team2data = await teamService.getTeamById(matchdata.team2);
        setTeam2(team2data);
      }
    } catch (error) {
      console.error("Error fetching match:", error);
    }
  };
  useEffect(() => {
    fetchMatch();
  }, [params.MatchId]);
  console.log(match);
  return (
    <DefaultLayout>
      {match && (
        <>
          <div className=" h-full w-full bg-white">
            <MatchDetails
              name1={team1 ? team1.name : "TBD"}
              name2={team2 ? team2.name : "TBD"}
              img1={
                team1
                  ? team1.logo
                  : "https://upload.wikimedia.org/wikipedia/en/c/c4/Tunisia_national_football_team_logo.png"
              }
              img2={
                team2
                  ? team2.logo
                  : "https://upload.wikimedia.org/wikipedia/en/c/c4/Tunisia_national_football_team_logo.png"
              }
              round={match.round}
            />
          </div>
          <div className="mt-8 flex w-full  flex-col  items-center justify-center  ">
            <MatchForm match={match} />
          </div>
        </>
      )}
    </DefaultLayout>
  );
};

export default Matches;
