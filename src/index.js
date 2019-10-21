import '../styles/main.css';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {getPitstops, sortPitstops} from './pitstops';
import {createCarousel, updateCarousel, bindFocusChangeListener} from './slider';
import {AppState} from './state';

const center = [-122.4194, 37.7749];

//Initialize the map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pit-stop-sf/ck20ovjj46l9f1cn6d7mnz0fj',
    center,
    zoom: 13,
    accessToken: process.env.PITSTOP_SF_ACCESS_TOKEN
});
// Add geolocate control to the map.
const geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});

const geocoder = new MapboxGeocoder({
    accessToken: process.env.PITSTOP_SF_ACCESS_TOKEN,
    mapboxgl: mapboxgl,
    collapsed: true
});

map.addControl(geolocateControl, 'bottom-right');
map.addControl(geocoder, 'bottom-left');


map.on('load', function (e) {
    // Get pitstop info from the map
    let pitstops = sortPitstops(getPitstops(map), center);
    // Initialize the carousel with pitstop data
    createCarousel(pitstops, center);

    // callback fires whenever app-state changes
    const state = new AppState(() => {
        if(state.change('focusPitstopIndex')){
            const change = state.change('focusPitstopIndex');
            // Unfocus previous
            for(const pitstop of pitstops){
                map.setFeatureState({
                    id: pitstop.id,
                    source: 'composite',
                    sourceLayer: 'Pitstops-SF'
                }, { focused: true });
            }

            // Focus current
            map.setFeatureState({
                id: pitstops[change.curr].id,
                source: 'composite',
                sourceLayer: 'Pitstops-SF'
            }, { focused: false });
            map.flyTo({
                center:pitstops[change.curr].geometry.coordinates,
                zoom: 14
            });
        }

        if(state.change('userLocation')){
            if(state.get('userLocation')){
                pitstops = sortPitstops(pitstops, state.get('userLocation'));
                updateCarousel(pitstops, state.get('userLocation'));
            }
        }
    });

    // Setup hooks to update app-state
    geolocateControl.on('geolocate', function(position) {
        state.set('userLocation', [position.coords.longitude, position.coords.latitude]);
    });
    bindFocusChangeListener((index) => {
        state.set('focusPitstopIndex', index);
    });
});


