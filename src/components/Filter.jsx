'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMakes } from '@/context/MakesContext';

export default function Filter({ make = {} }) {
  const { makes, loading } = useMakes();
  const [selectedMake, setSelectedMake] = useState(make.makeId ?? '');
  const [selectedYear, setSelectedYear] = useState(make.year ?? '');
  const [years] = useState(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);
  });

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedMake && selectedYear) {
      router.push(`/result/${selectedMake}/${selectedYear}`);
    }
  };

  return (
    <form className="bg-white p-8 rounded shadow-md" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold mb-4">Select a Vehicle Make and Year</h1>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Make:</label>
        <select
          value={selectedMake}
          onChange={(e) => setSelectedMake(e.target.value)}
          className="w-full p-2 border rounded"
          disabled={loading}
        >
          <option value="">Select a make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>
              {make.MakeName}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Year:</label>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded ${
          selectedMake && selectedYear ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        disabled={!selectedMake || !selectedYear}
      >
        Next
      </button>
    </form>
  );
}
