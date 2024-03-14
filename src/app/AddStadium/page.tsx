// pages/create-stadium.tsx
import React from 'react';
import CreateStadiumForm from '@/components/Stadium/CreateStadium';
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const CreateStadium: React.FC = () => {
  return (
    <DefaultLayout>
      <CreateStadiumForm  />

      </DefaultLayout>


  );
};

export default CreateStadium;
