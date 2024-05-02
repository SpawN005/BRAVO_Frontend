// pages/index.tsx
"use client";
import React from "react";
import Success from "@/components/Stripe/Success";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const Home: React.FC = () => {
  return (
    <DefaultLayout>
      <Success />
    </DefaultLayout>
  );
};

export default Home;
