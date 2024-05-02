import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TeamDetaille from "@/components/TeamP/TeamDetaille";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SelectGroupOne from "@/components/SelectGroup/SelectGroupOne";
import Link from "next/link";
import TableThree from "@/components/Tables/TableThree";

export const metadata: Metadata = {
  title: "LinkUpTournament",
  description: "This is LinkUpTournament",
};

const FormLayout = () => {
  return (
    <DefaultLayout>
      <TableThree />
    </DefaultLayout>
  );
};

export default FormLayout;
