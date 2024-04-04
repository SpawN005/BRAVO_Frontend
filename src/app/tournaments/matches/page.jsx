"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import matchService from "@/services/match/matchService";
import Image from "next/image";
import { useRouter } from "next/navigation";
const page = () => {
  const [matches, setMatches] = useState();
  const router = useRouter();
  useEffect(() => {
    const id = localStorage.getItem("Mytournament");
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
      {matches?.map((match) => {
        const { date, time } = formatDate(match.date);

        return (
          <div
            className="mb-2 "
            key={match._id}
            onClick={() => router.push(`/matches/${match._id}`)}
          >
            <div className="hover:border-gray flex w-full items-center justify-center gap-12 rounded-xl bg-white p-7 hover:cursor-pointer hover:border-2 hover:bg-slate-50">
              <p className="flex h-fit items-center text-xl">
                <span className="mx-6 flex font-semibold">
                  <Image
                    className="mr-2 rounded-full"
                    alt="iamge logo"
                    src={match?.team1?.logo}
                    width={40}
                    height={40}
                  ></Image>
                  {match?.team1?.name}
                </span>
              </p>

              <div className="text-center ">
                <p className="text-sm ">{match.stage}</p>
                <p className="text-sm font-bold">{time}</p>
                <p className="text-sm font-bold">{date}</p>
              </div>
              <p className="flex h-fit text-xl">
                <span className="mx-6  flex font-semibold">
                  {match?.team2?.name}
                  <Image
                    className="mr-2 rounded-full"
                    alt="iamge logo"
                    src={match?.team2?.logo}
                    width={40}
                    height={40}
                  ></Image>
                </span>
              </p>
            </div>
          </div>
        );
      })}
    </DefaultLayout>
  );
};

export default page;
