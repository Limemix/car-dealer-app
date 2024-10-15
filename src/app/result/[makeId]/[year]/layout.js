import Filter from '@/components/Filter';

export default function ResultLayout({ children, params }) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full p-4 md:w-1/4">
        <Filter make={params}  />
      </div>
      <div className="w-full p-4 md:w-3/4">
        {children}
      </div>
    </div>
  );
}
