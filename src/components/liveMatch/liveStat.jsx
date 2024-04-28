"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";

export default function LiveStat({ matchId }) {
  const [game, setGame] = useState(null);
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const [goalNames, setGoalNames] = useState([]);
  const [yellowCardNames, setYellowCardNames] = useState([]);
  const [redCardNames, setRedCardNames] = useState([]);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!matchId) return;

    const fetchGame = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/matches/${matchId}`,
        );
        setGame(response.data);
        console.log(game);
        setScoreTeam1(response.data.team1.stats.score);
        setScoreTeam2(response.data.team2.stats.score);
      } catch (error) {
        console.error("Error fetching game details:", error);
      }
    };

    fetchGame();
  }, [matchId]);

  useEffect(() => {
    if (!game) return;

    const socket = io("http://localhost:3001");

    socket.on("updateMatchStats", (updatedStats) => {
      if (updatedStats.scoringTeamStats.team === game.team1._id) {
        setScoreTeam1(updatedStats.scoringTeamStats.score);
      } else if (updatedStats.scoringTeamStats.team === game.team2._id) {
        setScoreTeam2(updatedStats.scoringTeamStats.score);
      }

      // Mise à jour de goalNames si un joueur marque un but
      if (updatedStats) {
        setGoalNames((prevGoalNames) => [
          ...prevGoalNames,
          {
            type: "goal",
            player: updatedStats.lastScoredPlayerName,
            date: Date.now(),
          },
        ]);
      }
    });

    socket.on("updateMatchCard", (updatedCard) => {
      // Vérifiez si la mise à jour concerne les cartons jaunes
      if (updatedCard) {
        // Ajouter le nom du joueur à la liste des cartons jaunes
        setYellowCardNames((prevYellowCardNames) => [
          ...prevYellowCardNames,
          { type: "yellowCard", player: updatedCard, date: Date.now() },
        ]);
      }
    });
    socket.on("updateMatchCardred", (updatedCardred) => {
      // Vérifiez si la mise à jour concerne les cartons red
      if (updatedCardred) {
        // Ajouter le nom du joueur à la liste des cartons red
        setRedCardNames((prevRedCardNames) => [
          ...prevRedCardNames,
          { type: "redCard", player: updatedCardred, date: Date.now() },
        ]);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [game]);

  useEffect(() => {
    const mergedEvents = [...goalNames, ...yellowCardNames, ...redCardNames];
    // Trier les événements par ordre chronologique
    mergedEvents.sort((a, b) => a.date - b.date);
    // Mettre à jour les événements
    setEvents(mergedEvents);
  }, [goalNames, yellowCardNames, redCardNames]);

  if (!game) {
    return <div>Loading...</div>;
  }
  return (
    <div className="bg-white pb-10">
      {/* Afficher les informations sur le match */}
      <div className="bg-white py-2 text-black">
        <div align="center">{game.stage}</div>
        <div className="flex w-full ">
          <div className="w-[35%]" align="center">
            <img src={game.team1.logo} width={70} />
          </div>
          <div className="mt-6 w-[32%] text-right text-black ">
            {game.team1.name}
          </div>
          <div className="mt-6 w-[16%] text-center ">
            {scoreTeam1} : {scoreTeam2}
          </div>
          <div className="mt-6 w-[32%]  text-left text-black">
            {game.team2.name}
          </div>
          <div className="w-[35%]" align="center">
            <img src={game.team2.logo} width={70} />
          </div>
        </div>
        <div className="text-center text-red-700">Live</div>
      </div>

      {/* Afficher les événements du match */}
      <div align="center" className="grid grid-cols-1 divide-y">
        <h1 className=" bg-gray-700 p-1 text-xl text-gray-300">Events</h1>
        {events.map((event, index) => (
          <div className="p-5" key={index}>
            {event.type === "goal" && <img src="/images/1.png" width={20} />}
            {event.type === "yellowCard" && (
              <img src="/images/yellowcard.png" width={20} />
            )}
            {event.type === "redCard" && (
              <img src="/images/red.png" width={20} />
            )}

            <p>{event.player}</p>
          </div>
        ))}
      </div>

      {/* Afficher les détails du match */}
      <div align="center" className="grid grid-cols-1 divide-y">
        <h1 className=" bg-gray-700 p-1 text-xl text-gray-300">
          Match Details
        </h1>
        <div className="p-2">Stadium - {game.stadium.name}</div>
        <div className="p-2">
          Referee - {game.referee.userIdentity.firstName}
        </div>
        <div className="p-2">{game.stage}</div>
      </div>
    </div>
  );
}
