// pages/[id]/page.tsx
"use client";
import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StadiumDetail from "@/components/Stadium/UpdateStadium";

const StadiumPage: React.FC = () => {
  return (
    <DefaultLayout>
      <StadiumDetail /> {/* Pass stadium as prop */}
    </DefaultLayout>
  );
};

export default StadiumPage;
