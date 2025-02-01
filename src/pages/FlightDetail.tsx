import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Plane, Clock, MapPin, ArrowLeft, AlertTriangle } from "lucide-react";
import { Flight } from "../types/flight";
import { getFlight } from "../services/api";
import { formatDate, getStatusColor } from "../lib/utils";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const FlightDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      if (!id) return;
      try {
        const data = await getFlight(id);
        setFlight(data);
      } catch (err) {
        console.log(err)
        setError("Failed to fetch flight details. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightDetails();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (error || !flight) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">{error || "Flight not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Flight Board
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <Plane className="h-8 w-8 text-gray-400 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Flight {flight.flightNumber}
                </h1>
                <p className="text-gray-500">{flight.airline}</p>
              </div>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                flight.status
              )}`}
            >
              {flight.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Origin</p>
                  <p className="font-medium">{flight.origin}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Destination</p>
                  <p className="font-medium">{flight.destination}</p>
                </div>
              </div>

              <div className="flex items-start">
                <Clock className="h-5 w-5 text-gray-400 mr-3 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Departure Time</p>
                  <p className="font-medium">
                    {formatDate(flight.departureTime)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
