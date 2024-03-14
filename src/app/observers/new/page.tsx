'use client'
import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import observerService from '@/services/observer/observerService';
import { useRouter } from 'next/navigation';
import useStore from '@/store'; // Adjust the path to your store.js

const AddObserverPage = () => {
  const [observer, setObserver] = useState({ firstName: "", lastName: "", email: "" });
  const router = useRouter();
  const tournamentId = localStorage.getItem('selectedTournamentId')

  const handleChange = (e:any) => {
    setObserver({ ...observer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault(); // This will prevent the default form submission behavior
    
    try {
      const data = {
        email: observer.email,
        firstName: observer.firstName,
        lastName: observer.lastName,
        permissionLevel: 1, // Set the permission level as required
        tournamentId:tournamentId
      };
  
      const response = await observerService.addObserver(data);
      console.log('Observer added successfully:', response);
      router.push('/observers');

      // Handle successful response
    } catch (error) {
      // Handle error
      console.error('Error adding observer:', error);
    }
  };

  return (
<DefaultLayout>
      <Breadcrumb pageName="Add Observer" />
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <form onSubmit={handleSubmit}>
          <div className="p-6.5">
            {/* First Name */}
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={observer.firstName}
                onChange={handleChange}
              />
            </div>
            {/* Last Name */}
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={observer.lastName}
                onChange={handleChange}
              />
            </div>
            {/* Email */}
            <div className="mb-4.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                value={observer.email}
                onChange={handleChange}
              />
            </div>
            {/* Submit Button */}
            <div className="flex justify-end w-full">
              <button type="submit" className="flex w-fit justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                Add
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};

export default AddObserverPage;
