'use client'
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Image from "next/image";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import axios from 'axios';


const Settings = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId"); // Retrieve user ID from localStorage
    if (!userId) {
      // Handle error: User ID is missing
      console.error('User ID is missing');
      return;
    }


    const updateData:any = {};

    if (formData.name) {
      updateData.userIdentity = { firstName: formData.name };
    }
  
    if (formData.email) {
      if (!updateData.userIdentity) {
        updateData.userIdentity = {};
      }
      updateData.userIdentity.email = formData.email;
    }
  
    if (formData.newPassword) {
      updateData.userIdentity.password = formData.newPassword;
    }

    try {
      console.log(updateData)
      await updateProfile(userId, updateData);
      // Handle success response, such as showing a success message or redirecting
    } catch (error) {
      // Handle errors, such as showing an error message to the user
      console.error('Profile update failed', error);
    }
    // Add validation for passwords and other fields as needed
    // Submit the data to the backend
  };
  const updateProfile = async (userId:any, profileData:any) => {
    try {
console.log(profileData)
      const response = await axios.patch(`http://localhost:3001/users/${userId}`, profileData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  return (
<DefaultLayout>
  <div className="mx-auto max-w-270">
    <Breadcrumb pageName="Settings" />

    <div className="grid grid-cols-5 gap-8">
      <div className="col-span-5 xl:col-span-3">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke px-7 py-4 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Personal Information
            </h3>
          </div>
          <div className="p-7">
          <form onSubmit={handleSubmit}>
              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="fullName">
                  Full Name
                </label>
                <input
  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  type="text"
  name="name" // Corresponds to formData.name
  id="fullName"
  placeholder="Your full name"
  value={formData.name}
  onChange={handleChange}
/> </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="emailAddress">
                  Email Address
                </label>
                <input
  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  type="email"
  name="email" // Corresponds to formData.email
  id="emailAddress"
  placeholder="Your email address"
  value={formData.email}
  onChange={handleChange}
/>              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="currentPassword">
                  Current Password
                </label>
                <input
  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  type="password"
  name="currentPassword" // Corresponds to formData.currentPassword
  id="currentPassword"
  placeholder="Your current password"
  value={formData.currentPassword}
  onChange={handleChange}
/>              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="newPassword">
                  New Password
                </label>
                <input
  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  type="password"
  name="newPassword" // Corresponds to formData.newPassword
  id="newPassword"
  placeholder="Your new password"
  value={formData.newPassword}
  onChange={handleChange}
/>              </div>

              <div className="mb-5.5">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white" htmlFor="confirmPassword">
                  Confirm New Password
                </label>
                <input
  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
  type="password"
  name="confirmPassword" // Corresponds to formData.confirmPassword
  id="confirmPassword"
  placeholder="Confirm your new password"
  value={formData.confirmPassword}
  onChange={handleChange}
/>              </div>

              <div className="flex justify-end gap-4.5">
                <button className="flex justify-center rounded border border-stroke px-6 py-2 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white" type="button">
                  Cancel
                </button>
                <button className="flex justify-center rounded bg-primary px-6 py-2 font-medium text-gray hover:bg-opacity-90" type="submit">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</DefaultLayout>

  );
};

export default Settings;
