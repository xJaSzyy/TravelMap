export function createFilter(map) {
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
}