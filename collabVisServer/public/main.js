//import { Deck } from '@deck.gl/core';
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

console.log(path.resolve(__dirname, '../.env'))
console.log(process)
console.log(process.env.TEST);

console.log('WTF')

let data = require('./data/allCollabs.json')
console.log(data)
// console.log(process.env.MAPBOX_TOKEN)




