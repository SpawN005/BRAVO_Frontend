import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import ClubInfo from "@/components/Myclub/ClubInfo";
import PlayerStats from "@/components/PlayerDetailles/PlayerStats";
import SoccerStats from "@/components/SoccerStats/SoccerStats";

export const metadata: Metadata = {
  title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
};

const Profile = () => {
  return (
    <DefaultLayout>
    <SoccerStats/>
    </DefaultLayout>
  );
};

export default Profile;
