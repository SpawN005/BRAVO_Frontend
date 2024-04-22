import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import Link from "next/link";
import LiveMatches from "@/components/liveMatch/liveMatches";
import { usePathname } from 'next/navigation'


export default function LiveMatche() {
  
    return (
      <>
        <LiveMatches /> 
      </>
    );
  }
