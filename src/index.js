import '../styles/main.css';
import mapboxgl from 'mapbox-gl';

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pit-stop-sf/ck1152h070d3n1do19iloxevj',
    center: [-122.4194, 37.7749],
    zoom: 13,
    accessToken: process.env.PITSTOP_SF_ACCESS_TOKEN
  });
  map.on('load', function (e) {
//    buildLocationList(locations);
  });

  // function buildLocationList(data) {
  //   for (i = 0; i < data.features.length; i++) {
  //     var currentFeature = data.features[i];
  //     var prop = currentFeature.properties;
  //     var listings = document.getElementById('listings');
  //     var listing = listings.appendChild(document.createElement('div'));
  //     listing.className = 'item';
  //     listing.id = "listing-" + i;
  //
  //     var link = listing.appendChild(document.createElement('a'));
  //     link.href = '#';
  //     link.className = 'title';
  //     link.dataPosition = i;
  //     link.innerHTML = prop.name;
  //
  //     var details = listing.appendChild(document.createElement('div'));
  //     details.innerHTML = prop.address;
  //     if (prop.hours) {
  //       details.innerHTML += ' <br> ' + prop.hours;
  //     }
  //   }
  // }