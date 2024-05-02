import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import RouteGuard from "@/components/Guard/RouteGuard";
import UserMatches from "@/components/Observer/UserMatches";

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <UserMatches></UserMatches>
      </DefaultLayout>
    </>
  );
}
