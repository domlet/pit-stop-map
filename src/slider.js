import $ from 'jquery';
import 'slick-carousel';
import distance from '@turf/distance';

let slider = null;

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

function createPitstopDOM(pitstop, index, distance) {
    const nearest = (index === 0) ? ' (nearest)' : '';
    return `
    <div class='slider-entry'>
      <div class='slider-entry-content'>
        <h3>${pitstop.Name}</h3>
        <h5>${pitstop.Address}</h5>
        <h6>${formatDistance(distance)}${nearest}</h6>
        <h6>${pitstop.Hours}</h6>
      </div>
    </div>
    `;
}


export function updateCarousel(pitstops, point) {
    if(slider == null){ throw new Error('Slider must be created before updating')};

    slider.slick('removeSlide', null, null, true);
    let idx = 0;
    for(const pitstop of pitstops){
        const dist = distance(pitstop.geometry.coordinates, point, {units: 'miles'});
        slider.slick('slickAdd', createPitstopDOM(pitstop.properties, idx, dist));
        idx++;
    };
}

export function bindFocusChangeListener(cb) {
    if(slider == null){ throw new Error('Slider must be created before binding focus change listener')};

    slider.on('afterChange', function(event, slick, currentSlide){
        cb(currentSlide);
    });
}

export function createCarousel(pitstops, center){
    slider  = $('.slider');
    slider.slick({
        dots: false,
    });

    updateCarousel(pitstops, center);
}