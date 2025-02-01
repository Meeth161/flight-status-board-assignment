const API_BASE_URL = "https://flight-status-mock.core.travelopia.cloud";

export async function getFlights() {
  const response = await fetch(`${API_BASE_URL}/flights`);
  if (!response.ok) {
    throw new Error("Failed to fetch flights");
  }
  return response.json();
}

export async function getFlight(id: string) {
  const response = await fetch(`${API_BASE_URL}/flights/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch flight details");
  }
  const flight = await response.json();

  if (!flight) {
    throw new Error("Flight not found");
  }

  return flight;
}
