import styles from './PlacePopup.module.css';

function PlacePopup({place}) {

    const yandex = place.yandex || `https://yandex.ru/maps/?pt=${place.lon},${place.lat}&z=18`;
    const dgis = place["2gis"] || `https://2gis.ru/search/${place.lat},${place.lon}`;

    return (
        <div className="popup-content">
            <div className={styles.popupTitle}>
                {place.name}
            </div>

            <div className={styles.popupDescription}>
                {place.description}
            </div>

            <div className={styles.popupInfo}>
                {
                    place.rating &&
                    <div className={styles.popupRating}>
                        ⭐ {place.rating.toFixed(1)}
                    </div>
                }

                {
                    place.hours &&
                    <div className={styles.popupHours}>
                        🕒 {place.hours}
                    </div>
                }
            </div>

            <div className={styles.popupButtons}>
                <a href={yandex} target="_blank" className={styles.mapIcon}>
                    <img src={`${import.meta.env.BASE_URL}icons/yandex.svg`} />
                </a>

                <a href={dgis} target="_blank" className={styles.mapIcon}>
                    <img src={`${import.meta.env.BASE_URL}icons/2gis.svg`} />
                </a>

                <button id={`route-btn-${place.id}`} className={`${styles.mapIcon} ${styles.routeButton}`}>
                    <img src={`${import.meta.env.BASE_URL}icons/route.png`} />
                </button>
            </div>
        </div>
    );
}

export default PlacePopup;