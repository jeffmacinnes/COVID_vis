import mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';

// import * as data from "./data/allCollabs.json";
const data = require("./data/allCollabs.json")
console.log(data);


mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [-122.4, 37.79],
    zoom: 3,
    pitch: 30
  });


const arcLayer = new ArcLayer({
    id: 'arc-layer',
    data,
    getWidth: 12,
    pickable: true,
    getSourcePosition: d => d.instA_coords,
    getTargetPosition: d => d.instB_coords,
    getSourceColor: [0, 255, 0, 0],
    getTargetColor: [255, 0, 0, 0]
})

map.on('load', () => {
    map.addLayer(new MapboxLayer({
        id: 'deckgl-circle',
        type: ScatterplotLayer,
        data: [
          {position: [-122.402, 37.79], color: [255, 0, 0], radius: 1000}
        ],
        getPosition: d => d.position,
        getColor: d => d.color,
        getRadius: d => d.radius,
        opacity: 0.3
    }))

    map.addLayer(new MapboxLayer({
        id: 'collaborations',
        type: ArcLayer,
        data,
        getWidth: 2,
        getStrokeWidth: 2,
        getHeight: .2,
        pickable: true,
        getSourcePosition: d => d.instA_coords,
        getTargetPosition: d => d.instB_coords,
        getSourceColor: [120, 0, 0, 20],
        getTargetColor: [120, 0, 0, 20]
    }))
})




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