"use client";
import React, { useState, useEffect, use } from "react";
import axios from "axios";
import getUserFromToken from "@/utilities/getUserFromToken ";
import "./tets.css";
import Image from "next/image";
const Table = () => {
  const [teamData, setTeamData] = useState(null);
  const [matches, setMatches] = useState(null);

  const user = getUserFromToken();

  useEffect(() => {
    const fetchTeamDetails = async () => {
      try {
        const response = await axios.get(
          `https://bravo-backend.onrender.com/team/team/manager/${user.userId}`,
        );
        setTeamData(response?.data[0]);
      } catch (error) {
        console.error("Error fetching team details:", error);
      }
    };

    fetchTeamDetails();
  }, [user.userId]);

  useEffect(() => {
    const fetchMatches = async () => {
      if (teamData) {
        try {
          const response = await axios.get(
            `https://bravo-backend.onrender.com/matches/matchess/${teamData._id}`,
          );
          setMatches(response?.data);
        } catch (error) {
          console.error("Error fetching matches:", error);
        }
      }
    };

    fetchMatches();
  }, [teamData]);
  console.log(matches);
  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="match-cards-container text-black">
      {matches &&
        matches.map((match, index) => (
          <div
            key={index}
            className="match-card flex items-center justify-center space-y-2"
            title="Click for match detail!"
          >
            <span className="event__check--hidden"></span>
            <div className="match-time">{match.tournament.name}</div>
            <div className="match-time">{formatDate(match.date)}</div>
            <div className="team-container">
              <div className="team-info mr-3 flex flex-col items-center justify-center">
                <Image
                  className="team-logo home-team w-6 rounded-full"
                  width={0}
                  height={0}
                  src={match.team1.logo}
                  alt={match.team1.name}
                />
                <div className="team-name ">{match.team1.name}</div>
              </div>
              <div className="vs">vs</div>
              <div className="team-info ml-3 flex flex-col items-center justify-center">
                <Image
                  className="team-logo away-team w-6 rounded-full"
                  width={0}
                  height={0}
                  src={match.team2.logo}
                  alt={match.team2.name}
                />
                <div className="team-name ">{match.team2.name}</div>
              </div>
            </div>
            <div className="score-container">
              <div className="score home-score">
                {match.matchstats.team1?.score || 0}
              </div>
              <div className="score-divider">-</div>
              <div className="score away-score">
                {match.matchstats.team2?.score || 0}
              </div>
            </div>

            {match.isWinner === teamData._id ? (
              <button
                className="badge-form"
                title="Win"
                data-testid="wcl-badgeForm-win"
              >
                <span className="badge-text">W</span>
              </button>
            ) : (
              <button
                className="badge-formLoss "
                title="Loss"
                data-testid="wcl-badgeForm-loss   "
              >
                <span className="badge-text  ">L</span>
              </button>
            )}
          </div>
        ))}
    </div>
  );
};

export default Table;
