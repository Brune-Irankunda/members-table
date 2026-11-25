
const BASE_URL = "https://dummyjson.com";

export async function api(endpoint) {
  const response = await fetch(`${BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error("Failed to fetch data. Please try again.");
  }

  return response.json();
}
