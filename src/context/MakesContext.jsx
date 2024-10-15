'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MakesContext = createContext();

export function MakesProvider({ children }) {
  const [makes, setMakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(process.env.NEXT_PUBLIC_DATA_TO_FETCH)
      .then((response) => {
        const sortedMakes = response.data.Results.sort((a, b) => {
          return a.MakeName.localeCompare(b.MakeName);
        });
        setMakes(sortedMakes);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching vehicle makes:', error);
        setLoading(false);
      });
  }, []);

  return (
    <MakesContext.Provider value={{ makes, loading }}>
      {children}
    </MakesContext.Provider>
  );
}

export function useMakes() {
  return useContext(MakesContext);
}
