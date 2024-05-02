"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import io from "socket.io-client";
import Image from "next/image";
import Link from 'next/link';

const LiveMatchsSnaps = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [scoreTeam1, setScoreTeam1] = useState(0);
  const [scoreTeam2, setScoreTeam2] = useState(0);
  const router = useRouter();
  useEffect(() => {
    const fetchMatches = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`http://localhost:3001/matches/`);
        setMatches(response.data);
      } catch (error) {
        console.error("Error loading matches:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMatches();
  }, []);
  console.log(matches);
  useEffect(() => {
    const socket = io("http://localhost:3001");

    socket.on("updateMatchStats", (updatedStats) => {
      if (matches.length > 0) {
        if (updatedStats.team === matches[0].team1._id) {
          setScoreTeam1(updatedStats.score);
        } else if (updatedStats.team === matches[0].team2._id) {
          setScoreTeam2(updatedStats.score);
        }
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [matches]);

  if (!matches.length) return <div>No live matchs at the moment</div>;

  return (
    <section>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="border-t border-gray-800 py-12 md:py-20">
          <div className="mx-auto max-w-3xl pb-12 text-center md:pb-20">
            <h1 className="h2 mb-4">
              Check our live matchs with a simple click
            </h1>
            <p className="text-xl text-gray-400">
              Vitae aliquet nec ullamcorper sit amet risus nullam eget felis
              semper quis lectus nulla at volutpat diam ut venenatis tellus—in
              ornare.
            </p>
          </div>

          <div className="mx-auto grid max-w-sm items-start gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6 ">
            {matches.slice(0, 3).map((match) => {
              return (
                <div
                  className="mb-2 "
                  key={match._id}
                  onClick={() => router.push(`/MatchLive/${match._id}`)} 
                  data-aos="fade-up" 
                >
                  <div className="hover:border-gray flex w-full items-center justify-center gap-12 rounded-xl bg-white md:p-7 hover:cursor-pointer hover:border-2 hover:bg-slate-50">
                    <div className="flex items-center">
                     
                      <div className="mr-2 flex flex-col items-center">
                       
                        <Image
                          className="rounded-full"
                          alt="team logo"
                          src={match.team1.logo}
                          width={40}
                          height={40}
                        />
                        <span className="text-sm text-black">
                          {match.team1.name}
                        </span>
                       
                      </div>
                      <span className="text-xl">{scoreTeam1}</span>
                     
                    </div>

                    <div className="text-center">
                      <p className="text-sm">{match.stage}</p>
                      <div className="mt-3 text-center text-red-700">Live</div>
                    </div>

                    <div className="flex items-center">
                      
                    
                      <span className="text-xl">{scoreTeam2}</span>
                     
                      <div className="ml-2 flex flex-col items-center">
                        
                       
                        <Image
                          className="rounded-full"
                          alt="team logo"
                          src={match.team2.logo}
                          width={40}
                          height={40}
                        />
                        <span className="text-sm text-black">
                          {match.team2.name}
                        </span>
                       
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mx-auto max-w-3xl py-8 text-center ">
          <span onClick={() => router.push(`/LiveMatches`)} className=" hover:underline cursor-pointer">See more....</span>
</div>

        </div>
      </div>
    </section>
  );
};
export default LiveMatchsSnaps;
