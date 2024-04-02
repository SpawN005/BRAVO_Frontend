// components/UserMatches.js
"use client";
import React, { useEffect, useState } from "react";
import matchService from "@/services/match/matchService";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter
import io from 'socket.io-client';

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
  const timeOptions = { hour: "2-digit", minute: "2-digit" };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return { date: formattedDate, time: formattedTime };
};

const UserMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
    const router = useRouter()
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId"); // Get the user ID from local storage
        if (userId) {
          const fetchedMatches = await matchService.getMatchesByUserId(userId);
          setMatches(fetchedMatches);
          console.log(fetchedMatches);

        }
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);
  console.log(matches)
  useEffect(() => {
    const socket = io('http://localhost:3001');

    // Listen for updates from the server
    socket.on('updateMatchStats', (updatedStats) => {
        // Mettez à jour les scores des équipes correspondantes
        if (matches.length > 0) {
            if (updatedStats.team === matches[0].team1._id) {
                setScoreTeam1(updatedStats.score);
            } else if (updatedStats.team === matches[0].team2._id) {
                setScoreTeam2(updatedStats.score);
            }
        }
    });

    return () => {
        // Déconnectez le socket lorsque le composant est démonté
        socket.disconnect();
    };
}, [matches]);

  if (isLoading) return <div>Loading matches...</div>;
  if (!matches.length) return <div>No matches found</div>;
  const handleMatchClick = (matchId:any) => {
    router.push(`/MatchLogging/${matchId}`); // Navigate to MatchLogging page
  };
  return (
    <div>
      <h2>User Matches</h2>
      {matches.map((match) => {
        const { date, time } = formatDate(match.date); // Destructure here inside map

        return (
          <div
          className="mb-2 "
          key={match._id}
          onClick={() => router.push(`/Live/${match._id}`)} // Navigate to Games component with match ID
        >
            <div className="flex w-full justify-center gap-12 rounded-xl bg-white p-7 items-center hover:border-2 hover:bg-slate-50 hover:cursor-pointer hover:border-gray">
              <p className="text-xl h-fit flex items-center">
                <span className="mx-6 font-semibold flex">
                    <Image className="rounded-full mr-2" alt="iamge logo" src={match.team1.logo} width={40} height={40}></Image>
                  {match.team1.name}
                </span>
                {scoreTeam1}
              </p>

              <div className="text-center ">
                <p className="text-sm ">{match.stage}</p>
                <p className="font-bold text-sm">{time}</p>
                <p className="font-bold text-sm">{date}</p>
              </div>
              <p className="text-xl h-fit flex">
                {scoreTeam2}
                <span className="mx-6  font-semibold flex">
                  {match.team2.name}
                  <Image className="rounded-full mr-2" alt="iamge logo" src={match.team2.logo} width={40} height={40}></Image>

                </span>
              </p>
            </div>
            {/* Add more details as needed */}
          </div>
        );
      })}
    </div>
  );
};

export default UserMatches;
