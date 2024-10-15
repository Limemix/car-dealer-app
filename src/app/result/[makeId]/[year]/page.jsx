import { Suspense } from 'react';
import VehicleList from '@/components/VehicleList';
import axios from 'axios';

// Function to fetch vehicle models based on the provided makeId and year
async function fetchVehicleModels(makeId, year) {
  try {
    // Fetch data from the external API using the makeId and model year
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_SPECIFIC_DATA}/makeId/${makeId}/modelyear/${year}?format=json`
    );

    // Return an object containing the vehicle make name and the list of models
    return {
      makeName: response.data.Results.length > 0 ? response.data.Results[0].Make_Name : 'Unknown Make', // If models are found, take the make name from the first model
      models: response.data.Results // Return the array of vehicle models
    };
  } catch (error) {
    // Handle any errors that occur during the data fetching process
    console.error('Error fetching vehicle models:', error);
    throw new Error('Failed to fetch vehicle models');
  }
}

// Component to fetch and render the vehicle models
async function VehicleModels({ makeId, year }) {
  // Fetch the makeName and models using the API call
  const { makeName, models } = await fetchVehicleModels(makeId, year);

  // Render the VehicleList component, passing both the models and the makeName as props
  return <VehicleList models={models} makeName={makeName} />;
}

// Main page component for displaying the result
export default function ResultPage({ params }) {
  // Extract makeId and year from the dynamic route parameters
  const { makeId, year } = params;

  return (
    <div>
      {/* Use Suspense to show a fallback while the vehicle models are being loaded */}
      <Suspense fallback={<p>Loading vehicle models...</p>}>
        {/* Render the VehicleModels component with makeId and year */}
        <VehicleModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
