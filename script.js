const map = L.map('map', {
    crs: L.CRS.EPSG3395
}).setView([55.047123, 82.904967], 16);

L.tileLayer('https://core-renderer-tiles.maps.yandex.com/tiles?l=map&v=21.06.15-0&x={x}&y={y}&z={z}', {
    attribution: '© Яндекс'
}).addTo(map);

fetch('places.json')
    .then(response => response.json())
    .then(places => {

        places.forEach((place, index) => {

            const yandex = place.yandex ||
                `https://yandex.ru/maps/?pt=${place.lon},${place.lat}&z=18`;

            const dgis = place["2gis"] ||
                `https://2gis.ru/search/${place.lat},${place.lon}`;

            const popup = `
                <div class="popup-title">${place.name}</div>
            
                <div class="popup-buttons">
            
                    <a href="${yandex}" target="_blank">
                        Яндекс
                    </a>
            
                    <a href="${dgis}" target="_blank">
                        2ГИС
                    </a>
            
                </div>
            `;

            const numberIcon = L.divIcon({
                className: 'number-marker',
                html: `<div>${index + 1}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker([place.lat, place.lon], {
                icon: numberIcon
            })
                .addTo(map)
                .bindPopup(popup);


            marker.on('click', function () {
                map.flyTo(
                    [place.lat, place.lon],
                    16,
                    {
                        duration: 0.75
                    }
                );
            });

        });

    });