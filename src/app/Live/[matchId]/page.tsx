"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import Games from "@/components/Observer/Games";
import "semantic-ui-css/semantic.min.css";
import { usePathname } from "next/navigation";

const Matches = () => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/");
  const matchId = pathSegments[pathSegments.length - 1];
  console.log(matchId);

  return (
    <DefaultLayout>
      <Games matchId={matchId} />
    </DefaultLayout>
  );
};

export default Matches;
