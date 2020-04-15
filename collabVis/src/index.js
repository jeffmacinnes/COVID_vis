import mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { BrushingExtension } from '@deck.gl/extensions';


const collabData = require("./data/allCollabs.json")
let instData = require("./data/allInstitutions.json")
instData = instData.map( d => {
    let o = Object.assign({}, d);
    o.coordinates = [d.lng, d.lat]
    return o
})

console.log(instData)


mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jeffmacinnes/ck8tvbqnd0rgg1iodvukijed2',
    center: [-122.4, 37.79],
    zoom: 3,
    pitch: 30,
    renderWorldCopies: false
  });

const brushingExtension = new BrushingExtension();

let arcColor = [247, 38, 113, 40];
let dotColor = [0, 255, 255];
let enableBrushing = false;

let collabLayer = new MapboxLayer({
    id: 'collaborations',
    type: ArcLayer,
    data: collabData,
    getWidth: 2,
    getHeight: .2,
    pickable: true,
    brushingRadius: 40000,
    brushingEnabled: enableBrushing,
    getSourcePosition: d => d.instA_coords,
    getTargetPosition: d => d.instB_coords,
    getSourceColor: d => arcColor,
    getTargetColor: d => arcColor,
    extensions: [brushingExtension],
    onHover: info => setHover(info)
});

let instLayer = new MapboxLayer({
    id: 'institutions',
    type: ScatterplotLayer,
    data: instData,
    getPosition: d => d.coordinates,
    filled: true,
    getFillColor: dotColor,
    radiusMinPixels: 1,
    getRadius: d => 500
});

map.on('load', () => {
    map.addLayer(collabLayer)
    map.addLayer(instLayer)
})

function setHover(info){
    if (!info.picked){
        if (enableBrushing){
            console.log('brushing off')
            enableBrushing = false;
            collabLayer.setProps({brushingEnabled: enableBrushing});
        }
    } else {
        if (!enableBrushing){
            console.log('brushing on')
            enableBrushing = true;
            collabLayer.setProps({brushingEnabled: enableBrushing});
        }
    }


}


// new Deck({
//     mapboxApiAccessToken: process.env.MAPBOX_TOKEN,
//     mapStyle: 'mapbox://styles/mapbox/light-v9',
//     initialViewState: {
//       longitude: -122.45,
//       latitude: 37.8,
//       zoom: 3
//     },
//     controller: true,
//     layers: [
//         new ScatterplotLayer({
//           data: [
//             {position: [-122.402, 37.79], color: [255, 0, 0], radius: 1000}
//           ],
//           getPosition: d => d.position,
//           getColor: d => d.color,
//           getRadius: d => d.radius,
//           opacity: 0.3
//         }),
//         new TextLayer({
//           data: [
//             {position: [-122.402, 37.79], text: 'Hello World'}
//           ],
//           getPosition: d => d.position,
//           getText: d => d.text
//         })
//       ]
// })