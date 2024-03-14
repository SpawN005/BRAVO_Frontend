import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TeamDetaille from "@/components/TeamP/TeamDetaille";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Next.js Form Layout | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Form Layout page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
           < TeamDetaille/>

    </DefaultLayout>
  );
};

export default FormLayout;
