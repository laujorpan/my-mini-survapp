const got = require('got')

function getEarthquakes(mag="all",freq="hour"){
  
    return new Promise((resolve,reject)=> {
        let valid_mag=["significant","all","week","month"];
        let valid_freq=["hour","day","week","month"];
        if(!valid_mag.includes(mag) || !valid_freq.includes(freq)){
            reject(`Datos sin sentido!`)
        }
        let url=`https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${mag}_${freq}.geojson`
        got(url)
        .then(data=> resolve(JSON.parse(data.body).features))
        .catch(err=> reject(err)) //.catch(reject)
    })
}
getEarthquakes("bababa","random")
.then(earthquakes=> earthquakes.forEach( item => console.log(`${item.properties.place}`)))
.catch(`No se Rick parece falso`);