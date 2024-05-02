"use client";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import CardDataStats from "../CardDataStats";
import MapOne from "../Maps/MapOne";
import authService from "../../services/auth/authService";

const ECommerce = () => {
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setIsLoading(true);
      const response = await authService.getUserStats(
        localStorage.getItem("userId"),
      );
      setStats(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching user stats:", error);
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getCardDataForPermissionLevel = (stats) => {
    if (stats.permissionLevel === 1) {
      return [
        {
          title: "Upcoming matches",
          total: stats.upcomingMatches,
        },
        {
          title: "Finished matches",
          total: stats.finishedMatches,
        },
        {
          title: "Live matches",
          total: stats.liveMatches,
        },
      ];
    } else if (stats.permissionLevel === 4) {
      return [
        {
          title: "Finished Tournament",
          total: stats.finishedTournaments,
        },
        {
          title: "Ongoing Tournament",
          total: stats.ongoingTournaments,
        },
        {
          title: "Total tournament",
          total: stats.tournamentCount,
        },
      ];
    } else if (stats.permissionLevel === 3) {
      return [
        { title: "Wins", total: stats.matchWon[0]?.win },
        { title: "Losses", total: stats.matchLost[0]?.lose },
        { title: "Draw", total: stats.matchNul[0]?.nul },
        { title: "Tournament played", total: stats.tournamentPlayed },
        { title: "Match played", total: stats.matchPlayed },
        { title: "Number of players", total: stats.playerCount },
      ];
    }
    return [];
  };

  const renderCardDataStats = (stats) => {
    const cardData = getCardDataForPermissionLevel(stats);
    return cardData.map((data, index) => (
      <CardDataStats key={index} title={data.title} total={data.total}>
        <svg
          width="22"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-3 0 32 32"
        >
          <g>
            <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
              <g fill="#22c55e" transform="translate(-314 -673)">
                <path d="M328 673h-2a2 2 0 00-2 2v28a2 2 0 002 2h2a2 2 0 002-2v-28a2 2 0 00-2-2zm10 16h-2a2 2 0 00-2 2v12a2 2 0 002 2h2a2 2 0 002-2v-12a2 2 0 00-2-2zm-20-7h-2a2 2 0 00-2 2v19a2 2 0 002 2h2a2 2 0 002-2v-19a2 2 0 00-2-2z"></path>
              </g>
            </g>
          </g>
        </svg>
      </CardDataStats>
    ));
  };

  const chartOptions = {
    chart: {
      fontFamily: "Satoshi, sans-serif",
      type: "donut",
    },
    colors: ["#22c55e", "#dc2626", "#eab308"],
    labels: ["Wins", "Losses", "Draws"],
    legend: {
      show: false,
      position: "bottom",
    },

    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          background: "transparent",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 2600,
        options: {
          chart: {
            width: 380,
          },
        },
      },
      {
        breakpoint: 640,
        options: {
          chart: {
            width: 200,
          },
        },
      },
    ],
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading stats: {error.message}</p>}
        {!isLoading && stats && renderCardDataStats(stats)}
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <div className="col-span-12 xl:col-span-8">
          {" "}
          {!isLoading && stats && stats.permissionLevel === 3 && (
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pb-5 pt-7.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-5">
              <div className="mb-3 justify-between gap-4 sm:flex">
                <div>
                  <h5 className="text-xl font-semibold text-black dark:text-white">
                    Team Analytics
                  </h5>
                </div>
                <div>
                  <div className="relative z-20 inline-block">
                    <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2"></span>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <div id="chartThree" className="mx-auto flex justify-center">
                  <ReactApexChart
                    options={chartOptions}
                    series={[
                      stats.matchWon[0]?.win,
                      stats.matchLost[0]?.lose,
                      stats.matchNul[0]?.nul,
                    ]}
                    type="donut"
                  />
                </div>
              </div>

              <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                      <span> Win</span>
                      <span> 65% </span>
                    </p>
                  </div>
                </div>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#dc2626]"></span>
                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                      <span> Losses </span>
                      <span> 34% </span>
                    </p>
                  </div>
                </div>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center">
                    <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#eab308]"></span>
                    <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
                      <span> Draw </span>
                      <span> 45% </span>
                    </p>
                  </div>
                </div>
                <div className="w-full px-8 sm:w-1/2">
                  <div className="flex w-full items-center"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ECommerce;
