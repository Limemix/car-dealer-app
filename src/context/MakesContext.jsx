'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Creates a new context to store the vehicle makes data
const MakesContext = createContext();

// Provider component to supply vehicle makes data to other components
export function MakesProvider({ children }) {
  // State to hold the list of vehicle makes and the loading status
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch vehicle makes from an external API when the component mounts
  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_ALL_DATA + "car?format=json") // Fetch all car makes from the provided API
      .then((response) => {
        // Sort the vehicle makes alphabetically by MakeName
        const sortedMakes = response.data.Results.sort((a, b) => {
          return a.MakeName.localeCompare(b.MakeName);
        });
        // Store the sorted vehicle makes in state
        setMakes(sortedMakes);
        // Set loading to false after data has been fetched
        setLoading(false);
      })
      .catch((error) => {
        // Handle any errors that occur during the fetch
        console.error('Error fetching vehicle makes:', error);
        // Ensure loading is set to false even if an error occurs
        setLoading(false);
      });
  }, []); // Empty dependency array ensures this runs only once when the component is mounted

  // Return the provider component, passing down the makes and loading status to the context consumers
  return (
    <MakesContext.Provider value={{ makes, loading }}>
      {children} {/* Render any child components wrapped within this provider */}
    </MakesContext.Provider>
  );
}

// Custom hook to access the MakesContext
export function useMakes() {
  return useContext(MakesContext); // Allows components to easily consume the makes and loading status
}
