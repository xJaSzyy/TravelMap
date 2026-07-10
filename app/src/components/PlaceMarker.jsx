import {useEffect} from "react";
import L from "leaflet";
import PlacePopup from "./PlacePopup";
import {renderToStaticMarkup} from "react-dom/server";

function PlaceMarker({map, place, index, clusterGroup}) {

    useEffect(() => {

        const colors = {
            food: "marker-food",
            walk: "marker-walk",
            rest: "marker-rest",
            fun: "marker-fun"
        };

        const markerClass = colors[place.type] || "marker-walk";

        const icon = L.divIcon({
            className: "number-marker",
            html: `
                <div class="${markerClass}">
                    ${index + 1}
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const marker = L.marker(
            [place.lat, place.lon],
            {
                icon
            }
        );

        const popup = renderToStaticMarkup(
            <PlacePopup place={place}/>
        );

        marker.bindPopup(
            popup,
            {
                closeButton: false
            }
        );

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