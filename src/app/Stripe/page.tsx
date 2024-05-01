"use client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Home from "../../components/Stripe/stripe";
import Success from "../../components/Stripe/Success";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const stripePromise = loadStripe("pk_test_51P88OSP7whfjob9c7Jwc06cN4c3Xqvn3zaKa8PtDSYxHTZJ47uPoV4T2SVtFWOgJkjnlxBIage2odpR4iFybPesS00TEVEqbeY"); // starts with pk_

const App: React.FC = () => {
  return (
      <DefaultLayout>
 
      <Home />
    
    </DefaultLayout>
    );
  }

export default App;