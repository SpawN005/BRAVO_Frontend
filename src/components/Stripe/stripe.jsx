'use client'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import getUserFromToken from '@/utilities/getUserFromToken ';
const data = [
  {
    id: 1,
    title: "Basic",
    price: "100",
  },
  {
    id: 2,
    title: "Pro",
    price: "1000",
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
              className={`bg-white px-6 py-8 rounded-xl text-[#4f7cff] w-full mx-auto grid 
              place-items-center ${
                planType === item.title.toLowerCase() &&
                "border-[16px] border-green-400"
              }`}
            >
              <img
                src={item.src}
                alt=""
                width={200}
                height={200}
                className="h-40"
              />
              <div className="text-4xl text-slate-700 text-center py-4 font-bold">
                {item.title}
              </div>
              <p className="lg:text-sm text-xs text-center px-6 text-slate-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos quaerat dolore sit eum quas non mollitia
                reprehenderit repudiandae debitis tenetur?
              </p>
              <div className="text-4xl text-center font-bold py-4">
                ${item.price}
              </div>
              <div className="mx-auto flex justify-center items-center my-3">
               
                  <button
                    onClick={() => checkout(Number(item.price))}
                    className="bg-[#3d5fc4] text-white rounded-md text-base uppercase w-24 py-2 font-bold"
                  >
                    Start
                  </button>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
export default Home;