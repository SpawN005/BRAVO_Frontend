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

const Matches = () => {
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
              router.push("tournaments/matches");
            }}
            key={index}
            className="block max-w-sm cursor-pointer rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {item.name}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </a>
        ))}
      </div>
    </DefaultLayout>
  );
};

export default Matches;
