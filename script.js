const map = L.map('map', {
    crs: L.CRS.EPSG3395,
    zoomControl: false,
}).setView([55.047123, 82.904967], 16);

L.tileLayer('https://core-renderer-tiles.maps.yandex.com/tiles?l=map&v=21.06.15-0&x={x}&y={y}&z={z}', {
    attribution: '© Яндекс'
}).addTo(map);

const filter = L.control({
    position: 'topright'
});

filter.onAdd = function () {

    const div = L.DomUtil.create('div', 'filter');

    div.innerHTML = `
        <label class="filter-item">
            <input type="checkbox" checked data-type="food">
            <span class="custom-checkbox marker-food"></span>
            Еда
        </label>
    
        <label class="filter-item">
            <input type="checkbox" checked data-type="walk">
            <span class="custom-checkbox marker-walk"></span>
            Прогулки
        </label>
    
        <label class="filter-item">
            <input type="checkbox" checked data-type="rest">
            <span class="custom-checkbox marker-rest"></span>
            Отдых
        </label>
    
        <label class="filter-item">
            <input type="checkbox" checked data-type="fun">
            <span class="custom-checkbox marker-fun"></span>
            Развлечения
        </label>
    `;

    L.DomEvent.disableClickPropagation(div);

    return div;
};

filter.addTo(map);

const markers = [];

fetch('places.json')
    .then(response => response.json())
    .then(places => {

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
            
                <div class="popup-buttons">
            
                    <a href="${yandex}" target="_blank" class="${markerClass}">
                        Яндекс
                    </a>
                    
            
                    <a href="${dgis}" target="_blank" class="${markerClass}">
                        2ГИС
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
                .bindPopup(popup);
            
            markers.push({
                marker: marker,
                type: place.type
            });
            
            marker.on('click', function () {
                map.flyTo([place.lat, place.lon], 16, {duration: 0.75});
            });
        });
    });

document.querySelectorAll('.filter input').forEach(input => {

    input.addEventListener('change', function () {

        const activeTypes = [];

        document.querySelectorAll('.filter input:checked')
            .forEach(cb => {
                activeTypes.push(cb.dataset.type);
            });


        markers.forEach(item => {

            if (activeTypes.includes(item.type)) {
                item.marker.addTo(map);
            } else {
                map.removeLayer(item.marker);
            }

        });

    });

});