const {getEarthquakes} = require("./module")

getEarthquakes("bababa","random")
.then(earthquakes=> earthquakes.forEach( item => console.log(`${item.properties.place}`)))
.catch(`No se Rick parece falso`);