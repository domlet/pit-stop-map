import distance from '@turf/distance';

export function getPitstops(map) {
    let pitstopsGeoJson = map.querySourceFeatures('composite', {
        sourceLayer: 'Pitstops-SF'
    });

    return pitstopsGeoJson.map( (pitstop) => {
        return {
            type: "Feature",
            properties: pitstop.properties,
            geometry: pitstop.geometry
        }
    });
}


export function sortPitstops(pitstops, point) {
    let sorted = pitstops.sort((p1, p2) => {
        const d1 = distance(p1.geometry.coordinates, point);
        const d2 = distance(p2.geometry.coordinates, point);
        return d1-d2;
    });

    // Add/Update distance field to properties
    return sorted.map((pitstop) => {
        const dist = distance(pitstop.geometry.coordinates, point, {units: 'miles'});
        pitstop.properties['distance'] = dist;

        return pitstop;
    });
}