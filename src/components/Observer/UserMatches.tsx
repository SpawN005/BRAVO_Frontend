// components/UserMatches.js
"use client";
import React, { useEffect, useState } from "react";
import matchService from "@/services/match/matchService";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Import useRouter

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
    const router = useRouter()
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const userId = localStorage.getItem("userId"); // Get the user ID from local storage
        if (userId) {
          const fetchedMatches = await matchService.getMatchesByUserId(userId);
          setMatches(fetchedMatches);
          console.log(fetchedMatches)
        }
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);

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
          <div className="mb-2 " key={match._id}             onClick={() => handleMatchClick(match._id)} // Add onClick handler
          >
            <div className="flex w-full justify-center gap-12 rounded-xl bg-white p-7 items-center hover:border-2 hover:bg-slate-50 hover:cursor-pointer hover:border-gray">
              <p className="text-xl h-fit flex items-center">
                <span className="mx-6 font-semibold flex">
                    <Image className="rounded-full mr-2" alt="iamge logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIF_JvujHrMJmNAznyhlReM9gbm7SbFDgoKg&usqp=CAU" width={40} height={40}></Image>
                  {match.team1.name}
                </span>
                {match.team1.score}
              </p>

              <div className="text-center ">
                <p className="text-sm ">{match.stage}</p>
                <p className="font-bold text-sm">{time}</p>
                <p className="font-bold text-sm">{date}</p>
              </div>
              <p className="text-xl h-fit flex">
                {match.team2.score}
                <span className="mx-6  font-semibold flex">
                  {match.team2.name}
                  <Image className="rounded-full ml-2" alt="iamge logo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIF_JvujHrMJmNAznyhlReM9gbm7SbFDgoKg&usqp=CAU" width={40} height={40}></Image>

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
