import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import RefereesTable from "@/components/Tables/RefereesTable";

export const metadata: Metadata = {
  title: "Next.js Tables | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Tables page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const ObserversPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Referees" />
      <div className="flex w-full  p-4 pr-0 justify-end"> 
      
      <Link className="flex w-36 ml-4 justify-center rounded bg-primary p-2 font-normal  text-gray hover:bg-opacity-90" href="/referees/new">+ Add Referee</Link>
      </div>

      <div className="flex flex-col gap-10">
        <RefereesTable/>
      </div>
    </DefaultLayout>
  );
};

export default ObserversPage;
