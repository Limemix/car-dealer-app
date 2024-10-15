import { Suspense } from 'react';
import VehicleList from '@/components/VehicleList';
import axios from 'axios';

// Функция для получения моделей по makeId и year
async function fetchVehicleModels(makeId, year) {
  try {
    const response = await axios.get(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );

    // Возвращаем имя производителя и модели
    return {
      makeName: response.data.Results.length > 0 ? response.data.Results[0].Make_Name : 'Unknown Make',
      models: response.data.Results
    };
  } catch (error) {
    console.error('Error fetching vehicle models:', error);
    throw new Error('Failed to fetch vehicle models');
  }
}

// Компонент для отображения моделей
async function VehicleModels({ makeId, year }) {
  const { makeName, models } = await fetchVehicleModels(makeId, year);

  // Передаем и models, и makeName в VehicleList
  return <VehicleList models={models} makeName={makeName} />;
}

// Страница результата
export default function ResultPage({ params }) {
  const { makeId, year } = params;

  return (
    <div>
      <Suspense fallback={<p>Loading vehicle models...</p>}>
        <VehicleModels makeId={makeId} year={year} />
      </Suspense>
    </div>
  );
}
