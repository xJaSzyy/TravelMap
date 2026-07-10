export async function loadPlaces() {
    const response = await fetch("places.json");
    return response.json();
}