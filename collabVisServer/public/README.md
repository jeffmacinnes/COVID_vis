# Browser Boilerplate

Boilerplate setup for front-end development and prototying. 

Quickly set up the infrastructure for a prototyping environment, that offers you the chance to:

* use npm packages browser-side
* use es6 functionality like import/export

This code base is a living beast -- edit and improve at will!

## Install
* `npm install -g browserify`: install browserify
* `npm install -g watchify`: install watchify

## Quick start
### start bundler/transpiler
* `npm i` : install all dependencies in `package.json`
* `npm run dev`: start bundler/transpiler

### test in browser
* launch your favorite webserver, e.g.
	* [VS Code live server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
	* python simple server: `python -m SimpleHTTPServer 5500`
* open browser, go to: `127.0.0.1:5550` and see the content of `index.html` 
 


## Overview
Directory Structure:

```
├── README.md
├── index.html
├── js
│   └── main.js
├── package-lock.json
└── package.json
└── .babelrc

```

### behind the scenes
* `index.html` reads the javascript file `<script src="bundle.js"></script>`
* `bundle.js` is the bundled, transpiled, and source mapped version of `js/main.js`
* `js/main.js` is edited by YOU!

* it uses [browserify](http://browserify.org/) to handle the npm package bundling
* it uses [babel](https://babeljs.io/) to handle transpiling 

The `npm run dev` command will automatically watch for changes to `js/main.js` and will immediately rebundle and transpile. 

In `js/main.js` (as well as any additional JS files you add), you are free to write using ES6 syntax and load and installed npm packages.


## How to:

### Install and use npm packages

