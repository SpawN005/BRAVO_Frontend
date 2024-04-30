import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import ClubInfo from "@/components/Myclub/ClubInfo";
import PlayerStats from "@/components/PlayerDetailles/PlayerStats";
import SoccerStats from "@/components/SoccerStats/SoccerStats";

const Profile = () => {
  return (
    <DefaultLayout>
      <SoccerStats />
    </DefaultLayout>
  );
};

export default Profile;
