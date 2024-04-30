"use client";
import React, { useState, useEffect } from "react";
import stadiumService from "@/services/stadium/stadiumService";
import { usePathname } from "next/navigation"; // Import usePathname from next/navigation

const StadiumDetail: React.FC = () => {
  // Use usePathname to get the current pathname
  const pathname = usePathname();
  // Extract stadium ID from pathname
  const pathSegments = pathname.split("/");
  const stadiumId = pathSegments[pathSegments.length - 1];

  // Define stadium state
  const [stadium, setStadium] = useState<any>(null);
  // Define map state
  const [map, setMap] = useState<any>(null);

  // Function to initialize Google Map
  const initMap = () => {
    const tunis = { lat: 36.8065, lng: 10.1815 }; // Default coordinates for Tunis
    let initialLocation = tunis; // Default initial location
    let marker: any = null; // Define marker variable

    // Check if stadium and stadium location are available
    if (stadium && stadium.location) {
      const location = stadium.location.split(",");
      const lat = parseFloat(location[0].trim());
      const lng = parseFloat(location[1].trim());
      initialLocation = { lat, lng }; // Set initial location to stadium's location
    }

    const mapInstance = new window.google.maps.Map(
      document.getElementById("map"),
      {
        center: initialLocation, // Set initial map center
        zoom: 10,
      },
    );
    setMap(mapInstance);

    if (stadium && stadium.location) {
      const location = stadium.location.split(",");
      const lat = parseFloat(location[0].trim());
      const lng = parseFloat(location[1].trim());
      marker = new window.google.maps.Marker({
        position: { lat, lng }, // Set marker position to stadium's location
        map: mapInstance,
        title: "Stadium",
      });
    }

    // Add a click event listener to the map instance
    mapInstance.addListener("click", async (e: any) => {
      // If a marker is already set, return to prevent creating a new marker
      if (marker) {
        return;
      }

      const latLng = e.latLng;
      const location = `${latLng.lat()}, ${latLng.lng()}`;
      setStadium((prevStadium) => ({
        ...prevStadium,
        location,
      }));

      // Create a marker at the clicked location
      marker = new window.google.maps.Marker({
        position: latLng,
        map: mapInstance,
        title: "Stadium",
      });

      // Fetch address using OpenStreetMap Nominatim API and update address field
      const address = await getAddressFromCoordinates(
        latLng.lat(),
        latLng.lng(),
      );
      setStadium((prevStadium) => ({
        ...prevStadium,
        address,
      }));
    });
  };

  // useEffect hook to fetch stadium data
  useEffect(() => {
    // Function to fetch stadium data
    const fetchStadium = async () => {
      try {
        // Fetch stadium data by ID
        const fetchedStadium = await stadiumService.getStadiumById(stadiumId);
        // Set fetched stadium data in state
        setStadium(fetchedStadium);
      } catch (error) {
        // Handle error if fetching fails
        console.error("Error fetching stadium:", error);
      }
    };

    // Check if stadium ID is available
    if (stadiumId) {
      // Call fetchStadium function
      fetchStadium();
    }
  }, [stadiumId]); // Pass stadiumId as a dependency to useEffect

  // useEffect hook to load Google Maps API script and initialize map on load
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=&callback=initMap`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [stadium]); // Re-run effect when stadium changes

  // Function to fetch address from coordinates using OpenStreetMap Nominatim API
  const getAddressFromCoordinates = async (
    latitude: number,
    longitude: number,
  ): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
      );
      const data = await response.json();
      if (data.error) {
        console.error("Error fetching address:", data.error.message);
        return "";
      }
      const address = data.display_name;
      return address;
    } catch (error) {
      console.error("Error fetching address:", error);
      return "";
    }
  };

  // Return JSX for the component
  return (
    <div className="flex h-full items-center justify-center">
      {stadium ? (
        <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
          <div id="map" className="mb-4 h-48 overflow-hidden rounded-lg"></div>
          <h1 className="mb-4 text-2xl font-bold">{stadium.name}</h1>
          <p className="mb-2">
            <span className="font-semibold">Address:</span> {stadium.address}
          </p>
          <p className="mb-2">
            <span className="font-semibold">Capacity:</span> {stadium.capacity}
          </p>
          <p>
            <span className="font-semibold">Available:</span>{" "}
            {stadium.isAvailable ? "Yes" : "No"}
          </p>
        </div>
      ) : (
        <p className="text-lg">Loading...</p>
      )}
    </div>
  );
};

export default StadiumDetail;
