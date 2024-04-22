'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import LiveStat from "@/components/liveMatch/liveStat";
import { usePathname } from 'next/navigation'


export default function MatchLive() {
  const pathname  = usePathname();
  const pathSegments = pathname.split('/');
  const matchId = pathSegments[pathSegments.length - 1];
console.log(matchId)
    return (
      <>
        
        <LiveStat matchId={matchId}/> 
               
      </>
    );
  }
