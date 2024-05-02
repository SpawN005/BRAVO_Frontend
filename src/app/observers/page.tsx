import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import ObserversTable from "@/components/Tables/ObserversTable";

export const metadata: Metadata = {
  title: "LinkUpTournament",
  description: "This is LinkUpTournament",
};

const ObserversPage = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Manage Observers" />
      <div className="flex w-full  justify-end p-4 pr-0">
        <Link
          className="text-gray ml-4 flex w-36 justify-center rounded bg-primary p-2  font-normal hover:bg-opacity-90"
          href="/observers/new"
        >
          + Add Observer
        </Link>
      </div>

      <div className="flex flex-col gap-10">
        <ObserversTable />
      </div>
    </DefaultLayout>
  );
};

export default ObserversPage;
