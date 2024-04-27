import React, { useEffect, useState } from "react";
import matchService from "@/services/match/matchService";
import { Bracket } from "react-brackets";

const KnockoutStage = ({ tournamentData }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const matches = await matchService.getBracket(tournamentData._id);

        setMatches(matches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, [tournamentData._id]);
  console.log(matches);

  return (
    <>
      {matches && matches.length > 0 ? (
        <Bracket rounds={matches} />
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default KnockoutStage;
