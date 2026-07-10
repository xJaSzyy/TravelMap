const markers = [];

const clusterGroup = L.markerClusterGroup({
    zoomToBoundsOnClick: false
});

export function createMarkers(map, places) {
    clusterGroup.on('clusterclick', function (e) {

        L.DomEvent.stop(e);

        map.flyToBounds(e.layer.getBounds(), {
            duration: 0.75,
            padding: [50, 50]
        });

    });
    
    places.forEach((place, index) => {

        const yandex = place.yandex || `https://yandex.ru/maps/?pt=${place.lon},${place.lat}&z=18`;

        const dgis = place["2gis"] || `https://2gis.ru/search/${place.lat},${place.lon}`;

        const colors = {
            food: "marker-food",
            walk: "marker-walk",
            rest: "marker-rest",
            fun: "marker-fun"
        };
        const markerClass = colors[place.type] || "marker-walk";

        const popup = `
                <div class="popup-title">${place.name}</div>
                
                <div class="popup-description">${place.description}</div>
                
                <div class="popup-info">
                    ${place.rating ? `
                        <div class="popup-rating">
                            ⭐ ${place.rating.toFixed(1)}
                        </div>
                    ` : ''}
                
                    ${place.hours ? `
                        <div class="popup-hours">
                            🕒 ${place.hours}
                        </div>
                    ` : ''}
                </div>
            
                <div class="popup-buttons">
                    <a href="${yandex}" target="_blank" class="map-icon">
                        <img src="icons/yandex.svg" alt="Яндекс">
                    </a>
                
                    <a href="${dgis}" target="_blank" class="map-icon">
                        <img src="icons/2gis.svg" alt="2ГИС">
                    </a>
                    
                    <a href="#" 
                       class="map-icon route-button"
                       data-lat="${place.lat}"
                       data-lon="${place.lon}">
                       <img src="icons/route1.png" alt="Построить маршрут">
                    </a>
                </div>
            `;

        const numberIcon = L.divIcon({
            className: 'number-marker',
            html: `
                    <div class="${markerClass}">
                        ${index + 1}
                    </div>
                `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });

        const marker = L.marker([place.lat, place.lon], {
            icon: numberIcon
        })
            .bindPopup(popup, {
                closeButton: false
            });

        clusterGroup.addLayer(marker);

        markers.push({
            marker: marker,
            type: place.type
        });

        marker.on('click', function () {
            map.flyTo([place.lat, place.lon], 16, {duration: 0.75});
        });
    });

    map.addLayer(clusterGroup);
}

export function getMarkers() {
    return markers;
}

export function getCluster() {
    return clusterGroup;
}