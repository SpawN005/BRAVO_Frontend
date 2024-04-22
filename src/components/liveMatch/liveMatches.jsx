"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import io from 'socket.io-client';
import axios from 'axios';

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState({}); // State to store scores of each match
  const router = useRouter();

  // Function to fetch matches and their initial scores
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/matches/');
        setMatches(response.data);
        
        // Get initial scores for each match
        const initialScores = {};
        response.data.forEach(match => {
          initialScores[match._id] = {
            scoreTeam1: match.matchStatsTeam1.score,
            scoreTeam2: match.matchStatsTeam2.score
          };
        });
        setScores(initialScores);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

  // Effect to handle socket updates for match scores
  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('updateMatchStats', (updatedStats) => {
      // Update scores for the corresponding match
      setScores(prevScores => ({
        ...prevScores,
        [updatedStats.matchId]: {
          scoreTeam1: updatedStats.team1Score,
          scoreTeam2: updatedStats.team2Score
        }
      }));
    });
console.log(scores)
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <div>Loading matches...</div>;
  if (!matches.length) return <div>No matches found</div>;

  return (
    <div>
      <h2 className="text-center text-black">Live Matches</h2>
      {matches.map((match) => (
        <div
          className="mb-2 mr-9 ml-9"
          key={match._id}
          onClick={() => router.push(`/MatchLive/${match._id}`)}
        >
          <div className="flex w-full justify-center gap-12 rounded-xl bg-white p-7 items-center hover:border-2 hover:bg-slate-50 hover:cursor-pointer hover:border-gray">
            <p className="text-xl h-fit flex text-black">
              <span className="mx-6 font-semibold flex">
                <Image className="rounded-full mr-2" alt="team logo" src={match.team1.logo} width={40} height={40} />
                {match.team1.name}
              </span>
              <span className="font-bold text-2xl">
                {scores[match._id] && scores[match._id].scoreTeam1}
              </span>
            </p>
            <div className="text-center">
              <p className="text-sm">{match.stage}</p>
              <div className="text-center mt-3 text-red-700">Live</div>
            </div>
            <p className="text-xl h-fit flex text-black">
              <span className="font-bold text-2xl">
                {scores[match._id] && scores[match._id].scoreTeam2}
              </span>
              <span className="mx-6 font-semibold flex">
                {match.team2.name}
                <Image className="rounded-full mr-2" alt="team logo" src={match.team2.logo} width={40} height={40} />
              </span>
            </p>
          </div>
          {/* Separator between matches */}
          <hr className="my-4 border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default LiveMatches;