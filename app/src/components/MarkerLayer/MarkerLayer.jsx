import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import PlaceMarker from '../PlaceMarker/PlaceMarker.jsx';
import Filter from '../Filter/Filter.jsx';
import LayersPanel from '../LayersPanel/LayersPanel.jsx';
import { categories } from '../../data/categories.js';

function MarkerLayer({ map, places }) {
    const [types, setTypes] = useState(() =>
        Object.fromEntries(categories.map((category) => [category.id, true]))
    );

    const [activeLayer, setActiveLayer] = useState('Август 2026');

    const clusterGroup = useRef(
        L.markerClusterGroup({
            zoomToBoundsOnClick: false,
        })
    ).current;

    useEffect(() => {
        if (!map) {
            return;
        }

        const handleClusterClick = (e) => {
            L.DomEvent.stop(e);

            map.flyToBounds(e.layer.getBounds(), {
                duration: 0.75,
                padding: [50, 50],
            });
        };

        clusterGroup.on('clusterclick', handleClusterClick);

        map.addLayer(clusterGroup);

        return () => {
            clusterGroup.off('clusterclick', handleClusterClick);

            map.removeLayer(clusterGroup);
        };
    }, [map, clusterGroup]);

    return (
        <>
            {places
                .filter((place) => place.layers.includes(activeLayer))
                .filter((place) => types[place.type])
                .map((place) => (
                    <PlaceMarker
                        key={place.id}
                        map={map}
                        place={place}
                        clusterGroup={clusterGroup}
                    />
                ))}

            <Filter types={types} setTypes={setTypes} />

            <LayersPanel
                layers={[...new Set(places.flatMap((place) => place.layers))]}
                activeLayer={activeLayer}
                setActiveLayer={setActiveLayer}
            />
        </>
    );
}

export default MarkerLayer;
