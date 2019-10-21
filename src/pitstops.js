import distance from '@turf/distance';

export function getPitstops(map) {
    let pitstopsGeoJson = map.querySourceFeatures('composite', {
        sourceLayer: 'Pitstops-SF'
    });

    return pitstopsGeoJson;
}


export function sortPitstops(pitstops, point) {
    let sorted = pitstops.sort((p1, p2) => {
        const d1 = distance(p1.geometry.coordinates, point);
        const d2 = distance(p2.geometry.coordinates, point);
        return d1-d2;
    });

    return sorted;
}