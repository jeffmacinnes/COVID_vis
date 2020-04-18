import mapboxgl from 'mapbox-gl';
import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { LayerManager } from "./layers";
import * as d3 from "d3";
// import * as d3Timer from "d3-timer";

// --- INIT MAP AND DECK ---------------------
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

const deck = new Deck({
    canvas: 'deck-canvas',
    width: '100%',
    height: '100%',
    initialViewState: INITIAL_VIEW_STATE,
    controller: true,
    onViewStateChange: ({viewState}) => {
      map.jumpTo({
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      });
    }
})

// --- LOAD DATA, CALL RENDER -------------------
let instData;
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
    
    renderLayers();  // init layers pre animation

    let t = d3.timer((elapsed) => {
        console.log(elapsed);
        if (elapsed > 200){
            showInst = true;
            renderLayers();
            t.stop()
        }
    }, 100);
})

let showInst = false;
function renderLayers(){
    console.log('renderLayers showInst ', showInst)
    const instLayer = new ScatterplotLayer({
        id: 'institutions',
        type: ScatterplotLayer,
        data: instData,
        getPosition: d => d.coordinates,
        filled: true,
        getFillColor: [255, 0, 0, 255],
        radiusMinPixels: 1,
        getRadius: showInst ? 50000 : 0,
        transitions: {
            getFillColor: 3000,
            getRadius: {
                duration: 3000,
                easing: d3.easeBackInOut
            }
        },
        updateTriggers:{
            getRadius: [showInst]
        }
    })

    deck.setProps({
        layers: [instLayer]
    })
};



let testButton = document.getElementById('test-button');
testButton.onclick = () => {
    console.log(showInst)
    showInst = true;
    console.log(showInst);
    renderLayers();
    console.log('here')
}