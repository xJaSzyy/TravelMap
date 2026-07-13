function PlacePopup({place}) {

    const yandex = place.yandex || `https://yandex.ru/maps/?pt=${place.lon},${place.lat}&z=18`;
    const dgis = place["2gis"] || `https://2gis.ru/search/${place.lat},${place.lon}`;

    return (
        <div className="popup-content">
            <div className="popup-title">
                {place.name}
            </div>

            <div className="popup-description">
                {place.description}
            </div>

            <div className="popup-info">
                {
                    place.rating &&
                    <div className="popup-rating">
                        ⭐ {place.rating.toFixed(1)}
                    </div>
                }

                {
                    place.hours &&
                    <div className="popup-hours">
                        🕒 {place.hours}
                    </div>
                }
            </div>

            <div className="popup-buttons">
                <a href={yandex} target="_blank" className="map-icon">
                    <img src={`${import.meta.env.BASE_URL}icons/yandex.svg`} />
                </a>

                <a href={dgis} target="_blank" className="map-icon">
                    <img src={`${import.meta.env.BASE_URL}icons/2gis.svg`} />
                </a>

                <button id={`route-btn-${place.id}`} className="map-icon route-button">
                    <img src={`${import.meta.env.BASE_URL}icons/route.png`} />
                </button>
            </div>
        </div>
    );
}

export default PlacePopup;