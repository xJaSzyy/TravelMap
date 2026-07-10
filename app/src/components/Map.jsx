import { useEffect } from "react";
import { useRef } from "react";
import L from "leaflet";

function Map() {

    const mapRef = useRef(null);
    
    useEffect(() => {
        
        const map = L.map(mapRef.current, {
            crs: L.CRS.EPSG3395,
            zoomControl: false
        }).setView([55.030204, 82.920430], 12);

        L.tileLayer('https://core-renderer-tiles.maps.yandex.com/tiles?l=map&v=21.06.15-0&x={x}&y={y}&z={z}', { attribution: '© Яндекс' }).addTo(map);

        console.log(mapRef.current);
        
    }, []);

    return (
        <div ref={mapRef} id="map"></div>
    );
}

export default Map;