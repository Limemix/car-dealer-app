import { Suspense } from 'react';
import Filter from '@/components/Filter';
import axios from 'axios';

export async function generateStaticParams() {
  try {
    const response = await axios.get(
      process.env.NEXT_PUBLIC_ALL_DATA + "car?format=json"
    );

    const makes = response.data.Results;
    const years = Array.from({ length: new Date().getFullYear() - 2014 }, (_, i) => 2015 + i);

    const paths = [];

    makes.forEach((make) => {
      years.forEach((year) => {
        paths.push({
          makeId: make.MakeId.toString(),
          year: year.toString(),
        });
      });
    });

    return paths;
  } catch (error) {
    console.error('Error fetching vehicle makes:', error);
    return [];
  }
}

export default function Home() {

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Suspense fallback={<div>Loading vehicle models...</div>}>
        <Filter />
      </Suspense>

    </div>
  );
}
