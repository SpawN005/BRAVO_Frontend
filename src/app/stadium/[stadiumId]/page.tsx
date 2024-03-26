// pages/[id]/page.tsx
'use client'
import React, { useState } from 'react';
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import StadiumDetail from '@/components/Stadium/DetailsStadium';
import { Stadium } from '@/services/stadium/stadiumService';

const StadiumPage: React.FC = () => {
  const [stadium, setStadium] = useState<Stadium | null>(null); // Define stadium state

  return (
    <DefaultLayout>
      <StadiumDetail stadium={stadium} setStadium={setStadium} /> {/* Pass stadium as prop */}
    </DefaultLayout>
  );
};

export default StadiumPage;
