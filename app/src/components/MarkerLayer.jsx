import {useEffect, useRef, useState} from "react";
import L from "leaflet";
import "leaflet.markercluster";
import PlaceMarker from "./PlaceMarker";

function MarkerLayer({map, places}) {

    const clusterGroup = useRef(
        L.markerClusterGroup({
            zoomToBoundsOnClick: false
        })
    ).current;

    useEffect(() => {

        if (!map) {
            return;
        }

        const handleClusterClick = (e) => {
            L.DomEvent.stop(e);

            map.flyToBounds(
                e.layer.getBounds(),
                {
                    duration: 0.75,
                    padding: [50, 50]
                }
            );
        };

        clusterGroup.on(
            "clusterclick",
            handleClusterClick
        );

        map.addLayer(clusterGroup);

        return () => {
            clusterGroup.off(
                "clusterclick",
                handleClusterClick
            );

            map.removeLayer(clusterGroup);
        };
    }, [map, clusterGroup]);

    return (
        <>
            {
                places.map((place) => (

                    <PlaceMarker
                        key={place.id}
                        map={map}
                        place={place}
                        clusterGroup={clusterGroup}
                    />

                ))
            }
        </>
    );

}

export default MarkerLayer;