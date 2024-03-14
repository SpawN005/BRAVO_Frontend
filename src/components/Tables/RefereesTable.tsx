'use client'
import React, { useEffect, useState } from 'react';
import refereeService from '@/services/referee/refereeService'; // Update the path accordingly
import { useRouter } from 'next/navigation'; // Import useRouter
import Link from 'next/link';
import swal from 'sweetalert';


const RefereesTable = () => {
  const [observers, setObservers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter(); // Create an instance of useRouter

  useEffect(() => {
    const fetchObservers = async () => {
      try {
        const response = await refereeService.getAllObservers();
        setObservers(response.data);
      } catch (err:any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchObservers();
  }, []);

  // Function to handle the delete action
  const handleDelete = async (observerId:any) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this observer!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then(async (willDelete) => {
      if (willDelete) {
        try {
          const response = await refereeService.deleteObserver(observerId);
          console.log('Observer deleted successfully:', response);
          setObservers(prevObservers => prevObservers.filter(obs => obs._id !== observerId));
          swal("The Referee has been deleted!", {
            icon: "success",
          });
        } catch (error) {
          console.error('Error deleting observer:', error);
          swal("Error deleting observer!", {
            icon: "error",
          });
        }
      } 
    });
  };


  const handleEdit = (observerId:any) => {
router.push(`/referees/update/${observerId}`);
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  // Function to handle the edit action


  return (
<div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Next Match
              </th>
              <th className="px-4 py-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {observers.map((observer : any, key:number) => (
              <tr key={key}>
                <td className="px-4 py-5 dark:border-strokedark">
                  <span className='flex  font-semibold'>

                  {observer.userIdentity.firstName} {/* Update as per your data structure */}
                  {observer.userIdentity.lastName} {/* Update as per your data structure */}
                  </span>
                  {observer.userIdentity.email} {/* Update as per your data structure */}
                </td>

                <td className="px-4 py-5 dark:border-strokedark">
                    
                </td>
                <td className="px-4 py-5 dark:border-strokedark flex">

                  <button onClick={() => handleEdit(observer._id)} className="flex w-28 ml-4 justify-center rounded bg-slate-400 p-2 font-normal text-gray hover:bg-opacity-90">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(observer._id)} className="flex w-28 ml-4 justify-center rounded bg-red-600 p-2 font-normal text-gray hover:bg-opacity-90">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default RefereesTable;
