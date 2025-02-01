import { Plane, RefreshCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatDate, getStatusColor } from "../lib/utils";
import { Flight } from "../types/flight";

interface FlightTableProps {
  flights: Flight[];
  isLoading: boolean;
  lastUpdated: Date;
  onRefresh: () => void;
}

export const FlightTable = ({
  flights,
  isLoading,
  lastUpdated,
  onRefresh,
}: FlightTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Flight Status
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Last updated {lastUpdated.toLocaleTimeString()}
            </p>
          </div>
          <button
            onClick={onRefresh}
            className="inline-flex items-center gap-x-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
          >
            <RefreshCcw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50/50">
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Flight
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Airline
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Origin
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Destination
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Departure
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {flights.map((flight) => (
              <tr
                key={flight.id}
                onClick={() => navigate(`/flight/${flight.id}`)}
                className="group hover:bg-blue-50/50 cursor-pointer transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 group-hover:bg-blue-200 transition-colors duration-150">
                      <Plane className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="ml-3 font-medium text-gray-900">
                      {flight.flightNumber}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {flight.airline}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {flight.origin}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {flight.destination}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {formatDate(flight.departureTime)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${getStatusColor(
                      flight.status
                    )}`}
                  >
                    {flight.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isLoading && flights.length === 0 && (
          <div className="px-6 py-12">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-sm text-gray-500">Loading flights...</p>
            </div>
          </div>
        )}

        {!isLoading && flights.length === 0 && (
          <div className="px-6 py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mx-auto">
              <Plane className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-sm font-medium text-gray-900">
              No flights found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Check back later for updated flight information.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
