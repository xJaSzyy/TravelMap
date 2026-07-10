const markers = [];

export function createMarkers(map, places) {

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
            
                <div class="popup-buttons">
                    <a href="${yandex}" target="_blank" class="map-icon">
                        <img src="icons/yandex.svg" alt="Яндекс">
                    </a>
                
                    <a href="${dgis}" target="_blank" class="map-icon">
                        <img src="icons/2gis.svg" alt="2ГИС">
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
            .addTo(map)
            .bindPopup(popup, {
                closeButton: false
            });


        markers.push({
            marker: marker,
            type: place.type
        });

        marker.on('click', function () {
            map.flyTo([place.lat, place.lon], 16, {duration: 0.75});
        });
    });

}

export function getMarkers() {
    return markers;
}