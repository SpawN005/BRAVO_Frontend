// components/UserMatches.js
"use client";
import React, { useEffect, useState } from "react";
import matchService from "@/services/match/matchService";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import io from "socket.io-client";
import axios from "axios";

const LiveMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [score, setScore] = useState(0);

  const router = useRouter();
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/matches/`);
        setMatches(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, [score]);
  console.log(matches);
  useEffect(() => {
    const socket = io("http://localhost:3001");

    // Listen for updates from the server
    socket.on("updateMatchStats", (updatedStats) => {
      console.log("test", updatedStats);
      // Mettez à jour les scores des équipes correspondantes
      setScore((prevScore) => prevScore + 1);
    });

    return () => {
      // Déconnectez le socket lorsque le composant est démonté
      socket.disconnect();
    };
  }, [matches]);

  if (isLoading) return <div>Loading matches...</div>;
  if (!matches.length) return <div>No matches found</div>;

  return (
    <div>
      <h2>Live Matches</h2>
      {matches.map((match) => {
        return (
          <div
            className="mb-2 "
            key={match._id}
            onClick={() => router.push(`/MatchLive/${match._id}`)} // Navigate to Games component with match ID
          >
            <div className="hover:border-gray flex w-full items-center justify-center gap-12 rounded-xl bg-white p-7 hover:cursor-pointer hover:border-2 hover:bg-slate-50">
              <p className="flex h-fit text-xl ">
                <span className="mx-6 flex font-semibold">
                  <Image
                    className="mr-2 rounded-full"
                    alt="iamge logo"
                    src={match.team1.logo}
                    width={40}
                    height={40}
                  ></Image>
                  {match.team1.name}
                </span>
                {match.matchStatsTeam1.score}
              </p>

              <div className="text-center ">
                <p className="text-sm ">{match.stage}</p>
                <div className="mt-3 text-center text-red-700">Live</div>
              </div>
              <p className="flex h-fit text-xl">
                {match.matchStatsTeam2.score}
                <span className="mx-6  flex font-semibold">
                  {match.team2.name}
                  <Image
                    className="mr-2 rounded-full"
                    alt="iamge logo"
                    src={match.team2.logo}
                    width={40}
                    height={40}
                  ></Image>
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LiveMatches;
