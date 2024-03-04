'use client'
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import observerService from '@/services/observer/observerService';
import { useRouter } from 'next/navigation';
import useStore from '@/store'; // Adjust the path to your store.js
import { usePathname } from 'next/navigation'

const UpdateObserverPage = () => {
  const [observer, setObserver] = useState({ firstName: "", lastName: "", email: "" });
  const router = useRouter();

  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const observerId = pathSegments[pathSegments.length - 1];
  useEffect(() => {
    if (observerId) {
      // Fetch the observer data
      const fetchObserverData = async () => {
        try {
          const response = await observerService.getObserverById(observerId);
          console.log(response.data.userIdentity)
          setObserver({ 
            firstName: response.data.userIdentity.firstName, 
            lastName: response.data.userIdentity.lastName, 
            email: response.data.userIdentity.email 
          });
        } catch (error) {
          console.error('Error fetching observer data:', error);
          // Handle error
        }
      };

      fetchObserverData();
    }
  }, [observerId]);

  const handleChange = (e:any) => {
    setObserver({ ...observer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      // Construct the data object for updating
      const data = {
        ...observer,
        // Include any other properties that need to be updated
      };
  
      const response = await observerService.updateObserver(observerId, data);
      console.log('Observer updated successfully:', response);
      router.push('/observers');

      // Handle successful response
    } catch (error) {
      console.error('Error updating observer:', error);
      // Handle error
    }
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Update Observer" />
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

export default UpdateObserverPage;
