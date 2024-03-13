import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import AddTeam from "@/components/AddTeam/AddForm";
import { useState } from 'react'
import { motion } from 'framer-motion'
import { z } from 'zod'
export const metadata: Metadata = {
  title: "Next.js Form Elements | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Elements page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormElementsPage = () => {
  return (
    <DefaultLayout>
      <AddTeam />
    </DefaultLayout>
  );
};

export default FormElementsPage;
