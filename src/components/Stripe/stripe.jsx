'use client'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import getUserFromToken from '@/utilities/getUserFromToken ';
const data = [
  {
    id: 1,
    title: "Basic",
    price: "100",
    duration:"3 Months",
    children:" Lorem ipsum dolor sit amet consectetur adipisicing  elit. Dignissimos quaerat dolore sit eum quas non ",

  },
  {
    id: 2,
    title: "Premium",
    price: "1000",
    duration:"1 Year",
    children:" Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos quaerat dolore sit eum quas non ",
  },
  
];
const Home = () => {
  const [planType, setPlanType] = useState("");

  const user = getUserFromToken();


  const checkout = async (price) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/create-subscription-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ plan: price , userId:user.userId}),
      });
      const session = await response.json();
      window.location = session.url;
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  
  return (
    <>
      <div className="flex flex-col items-center w-full mx-auto min-h-screen diagonal-background overflow-x-hidden">
        
        <div
          className="grid lg:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 z-50 place-items-center w-9/12 mx-auto
        mt-20"
        >
          {data.map((item, idx) => (
             <div 
             key={idx}

             className="border border-stroke bg-white px-7.5 py-8 shadow-default dark:border-strokedark dark:bg-boxdark h-full flex flex-col justify-between items-center ">
             <div className="flex flex-col items-center justify-center">
               <span className="text-sm font-medium">{item.title}</span>
               <h1 className="text-6xl font-bold text-black dark:text-white">
               {item.price}Dt
               </h1>
               <span className="text-sm font-medium">{item.duration}</span>
             </div>
             <div className="flex items-center justify-center font-bold text-black mt-4 ">
               {item.children}
             </div>
             <button
               onClick={() => checkout(Number(item.price))} 
               type="button"
               className="inline-block w-full rounded border-2 border-green-400 px-6 py-3 text-sm font-medium uppercase leading-normal text-green transition duration-150 ease-in-out hover:border-green-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-green-600 focus:border-green-600 focus:text-green-600 focus:outline-none focus:ring-0 active:border-green-700 active:text-green-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 mt-4"
             >
               Subscribe
             </button>
           </div>
           
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;