import Link from "next/link";
import DarkModeSwitcher from "./DarkModeSwitcher";
import DropdownMessage from "./DropdownMessage";
import DropdownNotification from "./DropdownNotification";
import DropdownUser from "./DropdownUser";
import Image from "next/image";
import SelectGroupOne from "../SelectGroup/SelectGroupOne";
import TournamentSelect from "../SelectGroup/TournamentSelect";
import getUserFromToken from '@/utilities/getUserFromToken ';
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import touramentsService from "@/services/tournament/tournamentsService";
import { confirmAlert } from 'react-confirm-alert'; // Import react-confirm-alert package
import 'react-confirm-alert/src/react-confirm-alert.css';
import axios from "axios";
 



const Header = (props: {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;

}) => {
  const [solde, setSolde] = useState<string | null>(null);
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null); // Added explicit type annotation for userData
  useEffect(() => {
    const user = getUserFromToken();
    if (user !== null) {
      setUserData(user); 
    }
    const fetchUserSolde = async () => {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);

        if (userId) {
          const userSolde = await touramentsService.getsolde(userId);
          setSolde(userSolde);
          console.log('Solde:', userSolde);
        }
      } catch (error) {
        console.error('Error fetching user solde:', error.message);
      }
    };

    fetchUserSolde();





  }, []);

  const handleNewTournamentClick = () => {
    if (solde && solde.solde===0) {
      // Display confirm alert when solde is 0
      confirmAlert({
        title: 'Insufficient Credits',
        message: 'You have no credits. Buy a new subscription to have more.',
        buttons: [
          {
            label: 'OK',
            onClick: () => {}
          }
        ]
      });
    } else {
      // Redirect to create tournament page
      router.push("/tournament/create");
    }
  };

  return (
    <header className="sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <div className="flex flex-grow items-center justify-end px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* <!-- Hamburger Toggle BTN --> */}
          <button
            aria-controls="sidebar"
            onClick={(e) => {
              e.stopPropagation();
              props.setSidebarOpen(!props.sidebarOpen);
            }}
            className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
          >
            <span className="relative block h-5.5 w-5.5 cursor-pointer">
              <span className="du-block absolute right-0 h-full w-full">
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-300"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "delay-400 !w-full"
                  }`}
                ></span>
                <span
                  className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!w-full delay-500"
                  }`}
                ></span>
              </span>
              <span className="absolute right-0 h-full w-full rotate-45">
                <span
                  className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-[0]"
                  }`}
                ></span>
                <span
                  className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white ${
                    !props.sidebarOpen && "!h-0 !delay-200"
                  }`}
                ></span>
              </span>
            </span>
          </button>
          {/* <!-- Hamburger Toggle BTN --> */}

          <Link className="block flex-shrink-0 lg:hidden" href="/">
            <Image
              width={32}
              height={32}
              src={"/images/logo/logo-icon.svg"}
              alt="Logo"
            />
          </Link>
        </div>

{ userData &&  userData.permissionLevel === 4 && 
<div className="flex w-full">
          <TournamentSelect/>   
          <button
        onClick={handleNewTournamentClick}
        className="flex w-40 ml-4 justify-center rounded bg-primary p-3 font-normal text-white hover:bg-opacity-90"
      >
        + New Tournament
      </button>

      <div className="flex">
        <button className="flex items-center w-25 ml-4 justify-center rounded bg-primary p-3 font-normal text-white hover:bg-opacity-90">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 mr-2 justify-center" viewBox="0 0 576 512">
        <path fill="#ffffff" d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"/>  </svg>        {solde && solde.solde}
        </button>

    </div>  
    </div>
    



}


{ userData &&  userData.permissionLevel === 3 && 
<div className="flex w-full">
          <button onClick={()=>{router.push("/team/add")}}className="flex w-40 ml-4 justify-center rounded bg-primary p-3 font-normal  text-white hover:bg-opacity-90">
              + Add Team
            </button>    
    </div>
}


        <div className="flex items-center gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            {/* <!-- Dark Mode Toggler --> */}
            <DarkModeSwitcher />
            {/* <!-- Dark Mode Toggler --> */}

            {/* <!-- Notification Menu Area --> */}
            <DropdownNotification />
            {/* <!-- Notification Menu Area --> */}

            {/* <!-- Chat Notification Area --> */}
            <DropdownMessage />
            {/* <!-- Chat Notification Area --> */}
          </ul>

          {/* <!-- User Area --> */}
          <DropdownUser />
          {/* <!-- User Area --> */}
        </div>
      </div>
    </header>
  );
};

export default Header;
