import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster";
import PlaceMarker from "./PlaceMarker";

function MarkerLayer({map, places}) {

    const [clusterGroup] = useState(() =>
        L.markerClusterGroup({
            zoomToBoundsOnClick:false
        })
    );

    useEffect(()=>{

        clusterGroup.on(
            "clusterclick",
            e=>{

                L.DomEvent.stop(e);


                map.flyToBounds(
                    e.layer.getBounds(),
                    {
                        duration:0.75,
                        padding:[50,50]
                    }
                );

            }
        );

        map.addLayer(clusterGroup);

        return ()=>{

            map.removeLayer(clusterGroup);

        };
    },[map]);

    return (
        <>
            {
                places.map((place,index)=>(

                    <PlaceMarker
                        key={place.id || index}
                        map={map}
                        place={place}
                        index={index}
                        clusterGroup={clusterGroup}
                    />

                ))
            }
        </>
    );

}

export default MarkerLayer;