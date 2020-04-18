import mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { LayerManager } from "./layers";
import * as d3 from "d3";

const INITIAL_VIEW_STATE = {
    latitude: 51.47,
    longitude: 0.45,
    zoom: 3,
    bearing: 0,
    pitch: 30
  };


mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jeffmacinnes/ck8tvbqnd0rgg1iodvukijed2',
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
  });

let instData;
let collabData;
const layerMan = new LayerManager();
map.on('load', () => {
    // *** Load all data ***************************
    Promise.all([
        d3.csv(process.env.INST_DATA_URL, d3.autoType),
        d3.csv(process.env.COLLABS_DATA_URL, d3.autoType)
    ]).then(([insts, collabs]) => {
        // handle institute data
        instData = insts.map( d => {
            let o = Object.assign({}, d);
            o.coordinates = [d.lng, d.lat]
            return o
        })
        layerMan.mkInstLayer(instData);

        let layers = layerMan.getLayers();
        for (let l of layers){
            map.addLayer(l);
        }

        layerMan.showInstLayer();

        //map.addLayer(instLayer(instData));

        parse and clean collab data
        collabData = collabs.map( d => {
            d['instA_coords'] = JSON.parse(d['instA_coords']);
            d['instB_coords'] = JSON.parse(d['instB_coords']);
            return d;
        })
        map.addLayer(collabLayer(collabData));
    })
})
