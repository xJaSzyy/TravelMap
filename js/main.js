import {createMap} from "./map.js";
import {createFilter} from "./filter.js";
import {loadPlaces} from "./api.js";
import {createMarkers, getMarkers, getCluster} from "./markers.js";
import {buildRoute} from "./route.js";

const map = createMap();

createFilter(map);

const places = await loadPlaces();

createMarkers(map, places);

document.addEventListener("click", e => {

    const button = e.target.closest(".route-button");

    if (!button) {
        return;
    }

    const place = {
        lat: Number(button.dataset.lat),
        lon: Number(button.dataset.lon)
    };

    drawRoute(place, map);

});

document.querySelectorAll(".filter input").forEach(input => {
    input.addEventListener("change", () => {

        const active = [...document.querySelectorAll(".filter input:checked")]
            .map(cb => cb.dataset.type);

        const cluster = getCluster();

        getMarkers().forEach(item => {
            if (active.includes(item.type)) {
                cluster.addLayer(item.marker);
            } else {
                cluster.removeLayer(item.marker);
            }
        });

    });
});

function drawRoute(place, map) {
    navigator.geolocation.getCurrentPosition(
        position => {
            buildRoute(
                map,
                [position.coords.latitude, position.coords.longitude],
                [place.lat, place.lon]
            );
        },
        error => {
            console.log(error.message);
        }
    );
}