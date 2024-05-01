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
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";

TimeAgo.addDefaultLocale(en);

const Matches = () => {
  const { setWinner } = useTournamentStore();
  const router = useRouter();
  const [tournaments, setTournaments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6); // Number of items per page
  const user = getUserFromToken();
  const currentDate = new Date();

  // Fetch tournaments data
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
  }, [user.userId]);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page on search change
  };

  // Function to handle filter change
  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Function to determine tournament status
  const getTournamentStatus = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (currentDate < start) {
      return "Upcoming";
    } else if (currentDate >= start && currentDate <= end) {
      return "Active";
    } else {
      return "Finished";
    }
  };

  // Filter tournaments based on search query and selected filter
  const filteredTournaments = tournaments?.data?.filter((item) => {
    const nameMatches = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const status = getTournamentStatus(item.startDate, item.endDate);
    const statusMatches =
      selectedFilter === "All" ||
      (selectedFilter === "Finished" && item.tournamentWinner) ||
      selectedFilter === status;

    return nameMatches && statusMatches;
  });

  // Paginate the filtered tournaments
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTournaments = filteredTournaments?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  // Handle next page navigation
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredTournaments?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Render the Matches component
  return (
    <DefaultLayout>
      <div className="mr-10 flex justify-end">
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchChange}
          className="rounded-lg border-[1.5px] border-stroke bg-white px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        />
        <select
          id="pricingType"
          name="pricingType"
          value={selectedFilter}
          onChange={handleFilterChange}
          className="rounded border-2 border-green-500 px-2 py-0 tracking-wider text-green-500 focus:border-green-500 focus:outline-none md:px-3 md:py-1"
        >
          <option value="All">All</option>
          <option value="Finished">Finished</option>
          <option value="Active">Active</option>
          <option value="Upcoming">Upcoming</option>
        </select>
      </div>
      <div className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentTournaments?.map((item, index) => (
          <div
            onClick={() => {
              localStorage.setItem("Mytournament", item._id);
              if (item.tournamentWinner) {
                setWinner(item.tournamentWinner.name);
              } else {
                setWinner(null);
              }
              router.push("tournaments/matches");
            }}
            key={index}
            className="max-w-sm cursor-pointer overflow-hidden rounded shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
          >
            <Image
              width={0}
              height={0}
              className="h-70 w-full"
              src={item.logo}
              alt={item.name}
            />
            <div className="px-6 py-4">
              <div className="mb-2 text-center text-3xl font-bold">
                {item.name}
              </div>
              <p className="text-center text-2xl text-gray-700 dark:text-gray-400">
                Winner:
              </p>
              {item.tournamentWinner ? (
                <p className="text-center text-xl font-semibold text-green-400 dark:text-gray-400">
                  {item.tournamentWinner.name}
                </p>
              ) : (
                <p className="text-center font-semibold text-gray-400 dark:text-gray-400">
                  TBD
                </p>
              )}
            </div>
            <div className="flex items-center justify-between p-4 font-semibold">
              <span>
                Starts: <ReactTimeAgo date={item.startDate} locale="en-US" />
              </span>
              <span>
                Ends: <ReactTimeAgo date={item.endDate} locale="en-US" />
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`rounded px-3 py-2 ${currentPage === 1 ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"}`}
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={
            currentPage >= Math.ceil(filteredTournaments?.length / itemsPerPage)
          }
          className={`rounded px-3 py-2 ${currentPage >= Math.ceil(filteredTournaments?.length / itemsPerPage) ? "cursor-not-allowed opacity-50" : "hover:bg-gray-200"}`}
        >
          Next
        </button>
      </div>
    </DefaultLayout>
  );
};

export default Matches;
