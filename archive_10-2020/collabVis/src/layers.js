import { Deck } from '@deck.gl/core';
import { ArcLayer, ScatterplotLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { BrushingExtension } from '@deck.gl/extensions';
import * as d3 from "d3";


let arcColor = [247, 38, 113, 40];
let dotColor = [0, 255, 255];
let enableBrushing = false;

const brushingExtension = new BrushingExtension();

export class LayerManager {
    constructor(){
        this.showInst = false;
        this.instLayer = null;
        this.collabLayer = null;
        this.layers = [];
    }

    showInstLayer(){
        this.showInst = true;
    }

    mkInstLayer(data){
        this.instLayer = new MapboxLayer({
            id: 'institutions',
            type: ScatterplotLayer,
            data: data,
            getPosition: d => d.coordinates,
            filled: true,
            getFillColor: this.showInst ? [255, 255, 255, 0] : dotColor,
            // radiusMinPixels: 1,
            getRadius: this.showInst ? 50000 : 0,
            transitions: {
                getFillColor: 3000,
                getRadius: {
                    duration: 3000,
                    easing: d3.easeBackInOut
                }
            },
            updateTriggers: {
                getRadius: [this.showInst]
            }
        });
        this.layers.push(this.instLayer);
    }

    mkCollabLayer(data){
        this.collabLayer = new MapboxLayer({
            id: 'collaborations',
            type: ArcLayer,
            data: data,
            getWidth: 2,
            getHeight: .5,
            pickable: true,
            brushingRadius: 40000,
            brushingEnabled: enableBrushing,
            getSourcePosition: d => d.instA_coords,
            getTargetPosition: d => d.instB_coords,
            getSourceColor: d => arcColor,
            getTargetColor: d => arcColor,
            extensions: [brushingExtension],    
            // onHover: info => setHover(info)
        });
        this.layers.push(this.collabLayer);
    }

    getLayers(){
        return this.layers;
    }
}

// export const collabLayer = (data) => {
//     return new MapboxLayer({
//         id: 'collaborations',
//         type: ArcLayer,
//         data: data,
//         getWidth: 2,
//         getHeight: .5,
//         pickable: true,
//         brushingRadius: 40000,
//         brushingEnabled: enableBrushing,
//         getSourcePosition: d => d.instA_coords,
//         getTargetPosition: d => d.instB_coords,
//         getSourceColor: d => arcColor,
//         getTargetColor: d => arcColor,
//         extensions: [brushingExtension],

//         // onHover: info => setHover(info)
//     });
// }


// export const instLayer = (data) => {
//     return new MapboxLayer({
//         id: 'institutions',
//         type: ScatterplotLayer,
//         data: data,
//         getPosition: d => d.coordinates,
//         filled: true,
//         getFillColor: showInst ? [255, 255, 255, 0] : dotColor,
//         radiusMinPixels: 1,
//         getRadius: showInst ? 5000 : 0,
//         transitions: {
//             getFillColor: 3000,
//             getRadius: {
//                 duration: 3000
//             }
//         }
//     });
// }