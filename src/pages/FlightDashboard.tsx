// FlightDashboard.tsx
import { useState, useEffect } from "react";
import { Flight } from "../types/flight";
import { Header } from "../components/Header";
import { FlightTable } from "../components/FlightTable";

export const FlightDashboard = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const fetchFlights = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://flight-status-mock.core.travelopia.cloud/flights"
      );
      const data = await response.json();
      setFlights(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
    // Fetch new data every 30 seconds
    const interval = setInterval(fetchFlights, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <FlightTable
            flights={flights}
            isLoading={isLoading}
            lastUpdated={lastUpdated}
            onRefresh={fetchFlights}
          />
        </div>
      </main>
    </div>
  );
};
