import '../styles/main.css';
import mapboxgl from 'mapbox-gl';
import {getPitstops, sortPitstops} from './pitstops';

const startLocation = [-122.4194, 37.7749];


//Initialize the map
let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pit-stop-sf/ck1152h070d3n1do19iloxevj',
    center: [-122.4194, 37.7749],
    zoom: 13,
    accessToken: process.env.PITSTOP_SF_ACCESS_TOKEN
});
// Add geolocate control to the map.
let geolocateControl = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true
});
map.addControl(geolocateControl);


map.on('load', function (e) {
    //Updated by the geolocate control whenever the users location changes
    let currentUserLocation = startLocation;
    let pitstops = sortPitstops(getPitstops(map), currentUserLocation);
    // Setup hook to update users current position and resort pitstops based on updated location
    geolocateControl.on('geolocate', function(position) {
        currentUserLocation = [position.coords.longitude, position.coords.latitude];
        pitstops = sortPitstops(pitstops, currentUserLocation);
    });
});


