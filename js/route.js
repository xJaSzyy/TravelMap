let routeLine = null;

export async function buildRoute(map, from, to) {
    const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson`
        .replace(/\s/g, '');

    const response = await fetch(url);
    const data = await response.json();

    const coordinates =
        data.routes[0]
            .geometry
            .coordinates
            .map(point => [
                point[1],
                point[0]
            ]);

    if (routeLine) {
        map.removeLayer(routeLine);
    }

    routeLine = L.polyline(
        coordinates,
        {
            color: "#48a5ed",
            weight: 5
        }
    ).addTo(map);
}