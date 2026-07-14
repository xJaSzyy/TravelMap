import {useEffect} from "react";
import L from "leaflet";
import PlacePopup from "../PlacePopup/PlacePopup.jsx";
import {renderToStaticMarkup} from "react-dom/server";
import {drawRoute} from "../../services/routing.js";
import styles from "./PlaceMarker.module.css";

function PlaceMarker({map, place, clusterGroup}) {

    useEffect(() => {

        const markerClass = `marker-${place.type}`;

        const icon = L.divIcon({
            className: styles.numberMarker,
            html: `<div class="${styles[markerClass]}">${place.id}</div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const marker = L.marker(
            [place.lat, place.lon], {icon}
        );

        const popup = renderToStaticMarkup(
            <PlacePopup place={place}/>
        );

        marker.bindPopup(popup, {
            closeButton: false
        });

        marker.on("popupopen", () => {
            const btn = document.getElementById(`route-btn-${place.id}`);

            if (btn) {
                btn.onclick = () => drawRoute(place, map);
            }
        });

        clusterGroup.addLayer(marker);

        marker.on("click", () => {
            map.flyTo([place.lat, place.lon], 16, {duration: 0.75});
        });

        return () => {
            clusterGroup.removeLayer(marker);
        };
    }, [map, place]);

    return null;
}

export default PlaceMarker;