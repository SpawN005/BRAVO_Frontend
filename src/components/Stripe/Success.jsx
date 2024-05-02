"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import getUserFromToken from "@/utilities/getUserFromToken ";

const Success = () => {
  const [sessionId, setSessionId] = useState("");
  const user = getUserFromToken();

  console.log(sessionId);

  const handlePaymentSuccess = () => {
    fetch("https://bravo-backend.onrender.com/api/v1/payment-success", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.userId }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        console.log(data.message);
        navigate("/");
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <div className="m-0 p-0">
      <div className="flex min-h-[80vh] w-full flex-col items-center justify-center">
        <div className="mx-auto my-10 flex flex-col items-center justify-center text-2xl text-green-600">
          <img src="/images/success.png" alt="" width={220} height={220} />
          <h3 className="pt-20 text-center text-4xl font-bold text-slate-700 lg:pt-0">
            Payment Successful
          </h3>
          <button
            onClick={() => handlePaymentSuccess()}
            className="my-16 w-40 rounded bg-[#009C96] px-2 py-2 text-xl uppercase text-white"
          >
            Confirm{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
