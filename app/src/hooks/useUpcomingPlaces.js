import { useMemo } from 'react';

export function useUpcomingPlaces(places) {
    return useMemo(() => {
        const now = new Date();

        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        const sorted = places
            .filter((place) => {
                const [hours, minutes] = place.time.split(':');

                const placeMinutes = Number(hours) * 60 + Number(minutes);

                return placeMinutes >= currentMinutes;
            })
            .sort((a, b) => {
                const getMinutes = (item) => {
                    const [h, m] = item.time.split(':');
                    return Number(h) * 60 + Number(m);
                };

                return getMinutes(a) - getMinutes(b);
            });

        return sorted.slice(0, 3);
    }, [places]);
}
