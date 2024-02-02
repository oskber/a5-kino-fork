import { API_BASE } from "../routes/api.js";


export async function fetchScreenings() {
    try {
        const response = await fetch(`${API_BASE}/screenings?populate=movie`);
        const screenings = await response.json();
        return screenings;
    } catch (error) {
        console.error('Error fetching screenings:', error);
        throw error;
    }
}




// populate = movie för att inkludera filmdata i varje screening
// filters[movie] = X för att hämta visningar av film med id X