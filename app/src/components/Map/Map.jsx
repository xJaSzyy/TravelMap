import { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import MarkerLayer from '../MarkerLayer/MarkerLayer.jsx';
import styles from './Map.module.css';
import TimelinePanel from '../TimelinePanel/TimelinePanel.jsx';

function Map({ places }) {
    const [map, setMap] = useState(null);

    const mapRef = useRef(null);

    useEffect(() => {
        const map = L.map(mapRef.current, {
            crs: L.CRS.EPSG3395,
            zoomControl: false,
            attributionControl: false,
        }).setView([55.030204, 82.92043], 12);

        setMap(map);

        L.tileLayer(
            'https://core-renderer-tiles.maps.yandex.com/tiles?l=map&v=21.06.15-0&x={x}&y={y}&z={z}'
        ).addTo(map);

        return () => {
            map.remove();
        };
    }, []);

    return (
        <>
            <div ref={mapRef} id={styles.map} />

            {map && <MarkerLayer map={map} places={places} />}

            <TimelinePanel map={map} places={places} />
        </>
    );
}

export default Map;
