import styles from './TimelinePanel.module.css';
import { useEffect, useMemo, useState } from 'react';
import { drawRoute } from '../../services/routing.js';

function TimelinePanel({ map, places }) {
    const [visits, setVisits] = useState([]);

    useEffect(() => {
        fetch(`${import.meta.env.BASE_URL}visits.json`)
            .then((res) => res.json())
            .then((data) => setVisits(data));
    }, []);

    const timelinePlaces = useMemo(() => {
        const today = new Date();

        return visits
            .map((visit) => {
                const place = places.find((place) => place.id === visit.placeId);

                if (!place) return null;

                const [day, month, year] = visit.date.split('.');
                const [hours, minutes] = visit.startTime.split(':');

                const visitDate = new Date(
                    Number(year),
                    Number(month) - 1,
                    Number(day),
                    Number(hours),
                    Number(minutes)
                );

                return {
                    ...place,
                    ...visit,
                    visitDate,
                };
            })
            .filter(Boolean)
            .filter((item) => item.visitDate >= today)
            .sort((a, b) => {
                if (a.visitDate - b.visitDate !== 0) {
                    return a.visitDate - b.visitDate;
                }

                return timeToMinutes(a.startTime) - timeToMinutes(b.startTime);
            })

            .slice(0, 3);
    }, [visits, places]);

    return (
        <div className={styles.timeline}>
            {timelinePlaces.map((place) => (
                <div key={place.id} className={styles.card} onClick={() => drawRoute(place, map)}>
                    <div className={styles.icon}>
                        <img src={place.icon} />
                    </div>

                    <div className={styles.info}>
                        <div className={styles.top}>
                            <span>{place.date}</span>
                        </div>

                        <div className={styles.time}>
                            {place.startTime}
                            {place.endTime && ` - ${place.endTime}`}
                        </div>

                        <div className={styles.note}>{place.note}</div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function timeToMinutes(time) {
    if (!time) return 0;

    const [hours, minutes] = time.split(':');

    return Number(hours) * 60 + Number(minutes);
}

export default TimelinePanel;
