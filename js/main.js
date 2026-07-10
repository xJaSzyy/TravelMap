import { createMap } from "./map.js";
import { createFilter } from "./filter.js";
import { loadPlaces } from "./api.js";
import { createMarkers, getMarkers, getCluster } from "./markers.js";

const map = createMap();

createFilter(map);

const places = await loadPlaces();

createMarkers(map, places);

document.querySelectorAll(".filter input").forEach(input => {
    input.addEventListener("change", () => {

        const active = [...document.querySelectorAll(".filter input:checked")]
            .map(cb => cb.dataset.type);

        const cluster = getCluster();

        getMarkers().forEach(item => {
            if(active.includes(item.type)) {
                cluster.addLayer(item.marker);
            } else {
                cluster.removeLayer(item.marker);
            }
        });

    });
});