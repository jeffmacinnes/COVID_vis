const appRoot = require("app-root-path");
const axios = require('axios').default;
const fs = require('fs');

// load existing data
const preprints_file = `${appRoot}/data/preprints.json`
let preprints = require(preprints_file);

// --- Helper Functions
const getURL = async (url) => {
    let header = {
        'User-Agent': 'collab-vis',
        'mailto': 'jeffmacinnes@gmail.com'
    };
    try {
        const resp = await axios.get(url, { headers: header });
        return resp.data;
    } catch (error) {
        console.log(error);
    }
} 

const updatePreprints = async () => {
    const collectionURL = 'https://connect.biorxiv.org/relate/collection_json.php?grp=181';
    let collection = await getURL(collectionURL);
    
    let allPrints = collection.rels;
    let added = 0;
    for (let p of allPrints){
        let thisDOI = p.rel_doi;
        if (!preprints.some(preprint => preprint.doi === thisDOI)){
            preprints.push( { doi: thisDOI} )
            added += 1;
        }
    }
    console.log(`added ${added} new preprints`);

    // save preprints file
    try {
        fs.writeFileSync(preprints_file, JSON.stringify(preprints));
    } catch (err) {
        console.log(err);
    }


}

// call the main function



updatePreprints();








