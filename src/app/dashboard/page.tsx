import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RouteGuard from "@/components/Guard/RouteGuard";

export const metadata: Metadata = {
  title: "LinkUpTournament",
  description: "This is LinkUpTournament",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <ECommerce />
      </DefaultLayout>
    </>
  );
}
