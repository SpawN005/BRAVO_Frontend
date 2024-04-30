"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import { useEffect, useState } from "react";
import tournamentsService from "@/services/tournament/tournamentsService";
import getUserFromToken from "@/utilities/getUserFromToken ";
import { useRouter } from "next/navigation";
import { useTournamentStore } from "@/app/store/zustand";
const Matches = () => {
  const { setWinner } = useTournamentStore();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const user = getUserFromToken();
  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const fetchedTournaments = await tournamentsService.getTournamentByUser(
          user.userId,
        );
        setTournaments(fetchedTournaments);
      } catch (error) {
        console.error("Error fetching tournaments:", error);
      }
    };

    fetchTournaments();
  }, []);
  console.log(tournaments);
  return (
    <DefaultLayout>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tournaments?.data?.map((item, index) => (
          <a
            onClick={() => {
              localStorage.setItem("Mytournament", item._id);
              item?.tournamentWinner
                ? setWinner(item.tournamentWinner.name)
                : setWinner(null);

              router.push("tournaments/matches");
            }}
            key={index}
            className="block max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>
            {item.tournamentWinner ? (
              <>
                <p className="text-center text-xl font-normal text-gray-700 dark:text-gray-400">
                  Tournament winner{" "}
                </p>
                <p className="text-center font-semibold text-green-400 dark:text-gray-400">
                  {" "}
                  {item.tournamentWinner.name}
                </p>
              </>
            ) : (
              ""
            )}
          </a>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Matches;
