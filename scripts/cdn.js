const COMPANY_ALIAS = process.env.CDN_COMPANY_ALIAS;
const CONSUMER_KEY = process.env.CDN_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CDN_CONSUMER_SECRET;
const ZONE_ID = process.env.CDN_ZONE_ID;
const maxcdn = require('maxcdn').create(COMPANY_ALIAS, CONSUMER_KEY, CONSUMER_SECRET);

const path = require('path');

const { getVersion, readDirAsync } = require('./utils');

const DIST_PATH = path.resolve(__dirname, '../dist');

async function purge(url, { files }) {    
    return new Promise((resolve, reject) => {
        maxcdn.del(url, { files }, function(err, results) {
            if (err) {
                reject(err);
            }
            resolve(results);
        })
    })
}

async function dropCache() {
    const version = await getVersion();
    const files = (await readDirAsync(DIST_PATH)).map(fileName => `/themes/${version}/${fileName}`);
    console.log(`Purging: ${files}`);
    try {
        results = await purge(`zones/pull.json/${ZONE_ID}/cache`, { files });
        console.log(results);
    } catch {
        console.log('Something goes wrong');
        process.exitCode = 1;
    }
}

dropCache();
