import '../styles/main.css';
import mapboxgl from 'mapbox-gl';
import {getPitstops, sortPitstops} from './pitstops';
import $ from 'jquery';
import 'slick-carousel';

const startLocation = [-122.4194, 37.7749];

function formatDistance(distance) {
    const oneMile = 5280; //feet
    const feet = (distance*oneMile)|0;//integer
    if(feet > 1000) {
        const rounded = Math.floor(distance*10)/10;
        return `${rounded} mi`;
    }else{
        return `${feet} ft`;
    }
}

function createPitstopDOM(pitstop) {
    return `
    <div class='slider-entry'>
      <div class='slider-entry-content'>
        <h3>${pitstop.Name}</h3>
        <h5>${pitstop.Address}</h5>
        <h6>${formatDistance(pitstop.distance)}</h6>
        <h6>${pitstop.Hours}</h6>
      </div>
    </div>
    `;
}


function updateCarousel(pitstops) {
    $('.slider').slick('removeSlide', null, null, true);

    for(const pitstop of pitstops){
        $('.slider').slick('slickAdd', createPitstopDOM(pitstop.properties));
    };
}

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
        updateCarousel(pitstops);
    });

    $('.slider').slick({
        dots: false
    });
    updateCarousel(pitstops);

});


