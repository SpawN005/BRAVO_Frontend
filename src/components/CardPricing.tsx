import Link from "next/link";
import React, { ReactNode } from "react";

interface CardPricingProps {
  type: string;
  total: string;
  duration: string;
  children: ReactNode;
  aos?: string;
  aosDelay?: string;
}

export default function CardPricing({
  type,
  total,
  duration,
  children,
  aos,
  aosDelay,
}: CardPricingProps) {
  return (
    <div
      className={`flex h-full flex-col items-center justify-between border border-stroke bg-white px-7.5 py-8 shadow-default dark:border-strokedark dark:bg-boxdark ${aos ? aos : ""}`}
      data-aos={aos}
      data-aos-delay={aosDelay}
    >
      <div className="flex flex-col items-center justify-center">
        <span className="text-sm font-medium">{type}</span>
        <h1 className="text-6xl font-bold text-black dark:text-white">
          {total}
        </h1>
        <span className="text-sm font-medium">{duration}</span>
      </div>
      <div className="mt-4 flex items-center justify-center font-bold text-black">
        {children}
      </div>
      <Link href="/auth/signin">
  <button
    type="button"
    className="text-green mt-4 inline-block w-full rounded border-2 border-green-400 px-6 py-3 text-sm font-medium uppercase leading-normal transition duration-150 ease-in-out hover:border-green-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-green-600 focus:border-green-600 focus:text-green-600 focus:outline-none focus:ring-0 active:border-green-700 active:text-green-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
  >
    Join now
  </button>
</Link>

    </div>
  );
}
