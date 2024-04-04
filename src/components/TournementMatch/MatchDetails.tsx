import React, { ReactNode } from "react";

interface CardPricingProps {
  img1: string;
  img2: string;
  name1: string;
  name2: string;
  round: string;
}

export default function MatchDetails({
  img1,
  img2,
  name1,
  name2,
  round,
}: CardPricingProps) {
  return (
    <div className="rounded-md border border-green-600 bg-white  p-4 py-8 shadow-lg dark:border-strokedark dark:bg-boxdark">
      <div className="font-semi-bold grid grid-cols-1 gap-4 text-center text-5xl text-green-600">
        <p className="mb-6">Round {round}</p>
      </div>
      <div className="flex w-full items-center justify-around  rounded-full bg-gray-100 py-6">
        <img className="" src={img1} width={100} height={100} />
        <p className="font-semi-bold text-3xl ">{name1} </p>
        <p className="mb-4 text-7xl font-bold text-green-600">vs</p>
        <p className="font-semi-bold text-3xl ">{name2} </p>
        <img className="" src={img2} width={100} height={100} />
      </div>
    </div>
  );
}
