import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Matches = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-242.5">
        <h1>Hello</h1>

      </div>
    </DefaultLayout>
  );
};

export default Matches;
