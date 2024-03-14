// pages/index.tsx
import React from 'react';
import Stadium from '@/components/Stadium';
import DefaultLayout from "@/components/Layouts/DefaultLayout";



const Home: React.FC = () => {
  return (
    <DefaultLayout>
 
      <Stadium />
    
    </DefaultLayout>
  );
};

export default Home;
