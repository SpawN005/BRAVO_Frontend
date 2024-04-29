"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import matchService from "@/services/match/matchService";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";
import { useTournamentStore } from "@/app/store/zustand";
const page = () => {
  const { width, height } = useWindowSize();
  const { tournamentWinner } = useTournamentStore();
  const [matches, setMatches] = useState();
  const router = useRouter();
  const id = localStorage.getItem("Mytournament");
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const fetchedMatches = await matchService.getMatchesByTournament(id);
        setMatches(fetchedMatches);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchMatches();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dateOptions = { year: "numeric", month: "2-digit", day: "2-digit" };
    const timeOptions = { hour: "2-digit", minute: "2-digit" };

    const formattedDate = date.toLocaleDateString("en-US", dateOptions);
    const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

    return { date: formattedDate, time: formattedTime };
  };
  console.log(matches);
  return (
    <DefaultLayout>
      {tournamentWinner.name ? (
        <>
          <Confetti width={width} height={height} />{" "}
          <div> The Winner is {tournamentWinner.name}</div>
        </>
      ) : (
        ""
      )}

      <div className="inline-flex rounded-md shadow-sm">
        <Link
          href="/tournaments/matches"
          aria-current="page"
          className="rounded-s-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-blue-700 hover:bg-gray-100 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
        >
          Matches
        </Link>
        <Link
          href={`/tournament/details`}
          className="border-b border-t border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
        >
          Standings
        </Link>
      </div>
      {matches?.map((match) => {
        const { date, time } = formatDate(match.date);

        return (
          <div
            className="mb-2 "
            key={match._id}
            onClick={() => router.push(`/matches/${match._id}`)}
          >
            <div className="hover:border-gray flex w-full items-center justify-center gap-12 rounded-xl bg-white p-7 hover:cursor-pointer hover:border-2 hover:bg-slate-50">
              <div className="flex h-fit flex-row items-center space-x-2 text-xl font-semibold">
                <Image
                  className="mr-2 rounded-full"
                  alt="iamge logo"
                  src={
                    match?.team1?.logo
                      ? match?.team1?.logo
                      : "https://bramptonsc.com/wp-content/uploads/2018/07/TBD.jpg"
                  }
                  width={80}
                  height={80}
                ></Image>
                <p>{match?.team1?.name}</p>
              </div>

              <div className="text-center ">
                <p className="text-sm ">{match.stage}</p>
                {match.date != null ? (
                  <>
                    <p className="text-sm font-bold">{time}</p>
                    <p className="text-sm font-bold">{date}</p>
                  </>
                ) : (
                  <p className="text-sm font-bold">TBA</p>
                )}
              </div>
              <div className="flex h-fit flex-row items-center space-x-2 text-xl font-semibold">
                <p>{match?.team2?.name}</p>
                <Image
                  className="mr-2 rounded-full"
                  alt="iamge logo"
                  src={
                    match?.team2?.logo
                      ? match?.team2?.logo
                      : "https://bramptonsc.com/wp-content/uploads/2018/07/TBD.jpg"
                  }
                  width={80}
                  height={80}
                ></Image>
              </div>
            </div>
          </div>
        );
      })}
    </DefaultLayout>
  );
};

export default page;
