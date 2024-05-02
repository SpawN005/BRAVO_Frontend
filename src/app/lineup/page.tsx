import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import App from "@/components/Myclub/lineup";

export const metadata: Metadata = {
  title: "LinkUpTournament",
  description: "This is LinkUpTournament",
};

export default function Home() {
  return (
    <>
      <DefaultLayout>
        <App />
      </DefaultLayout>
    </>
  );
}
