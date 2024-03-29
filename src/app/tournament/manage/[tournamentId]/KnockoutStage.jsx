import React, from "react";
import {
  SingleEliminationBracket,
  DoubleEliminationBracket,
  Match,
  SVGViewer,
} from "@g-loot/react-tournament-brackets";
const KnockoutStage = ({ tournament }) => {

  const m = [
    // First Round Matches
    {
      id: 1,
      name: "Match 1",
      nextMatchId: 5, // ID of the next match in the bracket
      tournamentRoundText: "First Round",
      startTime: "2024-03-30T09:00:00",
      state: "DONE",
      participants: [
        { id: "team1_id", resultText: "WON", isWinner: false, status: "PLAYED", name: "Team 1" },
        { id: "team2_id", resultText: null, isWinner: true, status: "PLAYED", name: "Team 2" }
      ]
    },
    {
      id: 2,
      name: "Match 2",
      nextMatchId: 5,
      tournamentRoundText: "First Round",
      startTime: "2024-03-30T10:00:00",
      state: "DONE",
      participants: [
        { id: "team3_id", resultText: "WON", isWinner: false, status: "PLAYED", name: "Team 3" },
        { id: "team4_id", resultText: null, isWinner: true, status: "PLAYED", name: "Team 4" }
      ]
    },
    {
      id: 3,
      name: "Match 3",
      nextMatchId: 6,
      tournamentRoundText: "First Round",
      startTime: "2024-03-30T11:00:00",
      state: "DONE",
      participants: [
        { id: "team5_id", resultText: "WON", isWinner: false, status: "PLAYED", name: "Team 5" },
        { id: "team6_id", resultText: null, isWinner: true, status: "PLAYED", name: "Team 6" }
      ]
    },
    {
      id: 4,
      name: "Match 4",
      nextMatchId: 6,
      tournamentRoundText: "First Round",
      startTime: "2024-03-30T12:00:00",
      state: "DONE",
      participants: [
        { id: "team7_id", resultText: "WON", isWinner: true, status: "PLAYED", name: "Team 7" },
        { id: "team8_id", resultText: null, isWinner: false, status: "PLAYED", name: "Team 8" }
      ]
    },
  
    // Second Round Matches (Semifinals)
    {
      id: 5,
      name: "Semifinal 1",
      nextMatchId: 7,
      tournamentRoundText: "Semifinals",
      startTime: "2024-03-31T10:00:00",
      state: "DONE",
      participants: [
        // Participants from Match 1 and Match 2 will proceed to Semifinal 1
        // Adjust the participant IDs and resultText accordingly
      ]
    },
    {
      id: 6,
      name: "Semifinal 2",
      nextMatchId: 7,
      tournamentRoundText: "Semifinals",
      startTime: "2024-03-31T11:00:00",
      state: "DONE",
      participants: [
        // Participants from Match 3 and Match 4 will proceed to Semifinal 2
        // Adjust the participant IDs and resultText accordingly
      ]
    },
  
    // Final Match
    {
      id: 7,
      name: "Final Match",
      nextMatchId: null, // Final match has no next match
      tournamentRoundText: "Final",
      startTime: "2024-04-01T12:00:00",
      state: "DONE",
      participants: [
        // Participants from Semifinal 1 and Semifinal 2 will compete in the Final Match
        // Adjust the participant IDs and resultText accordingly
      ]
    }
  ];
  
  
  return (
    <SingleEliminationBracket
  
      matches={m}
      matchComponent={Match}
      width={1024} height={1024} 
      svgWrapper={({ children, ...props }) => (
        <SVGViewer  width={4048} height={4048}{...props}>
          {children}
        </SVGViewer>
      )}
    />
  );
};

export default KnockoutStage;
