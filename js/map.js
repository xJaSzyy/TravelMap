export function createMap() {
    const map = L.map('map', {
        crs: L.CRS.EPSG3395,
        zoomControl: false
    }).setView([55.047123, 82.904967], 16);

    L.tileLayer(
        'https://core-renderer-tiles.maps.yandex.com/tiles?l=map&v=21.06.15-0&x={x}&y={y}&z={z}',
        {
            attribution: '© Яндекс'
        }
    ).addTo(map);

    return map;
}