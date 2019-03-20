const vorpal = require('vorpal')();
const {getEarthquakes} = require("./module.js")

vorpal
  .command('report', 'Earthquakes info".')
  .action(function(args, callback) {
    this.prompt([
      {
        type: 'list',
        name: 'period',
        choices: [
          {"name": "Last hour", "value": "hour"},
          {"name": "Last day", "value": "day"},
          {"name": "Last 7 days", "value": "week"},
          {"name": "Last 30 days", "value": "month"}
          ],
        message: 'Which Period?'        
      },
      {
      type: 'list',
      name: 'magnitude',
      choices: [
        {"name": "All earthquakes", "value": "all"},
        {"name": "Just earthquakes +M1.0", "value": "1.0"},
        {"name": "Just earthquakes +M2.5", "value": "2.5"},
        {"name": "Just earthquakes +M4.0", "value": "4.5"},
        {"name": "Just significative earthquakes", "value": "significant"}
        ],
      message: 'What magnitude?'
    }], result => {
      getEarthquakes(result.magnitude, result.period)
        .then(earthquakes=> earthquakes.forEach( item => console.log(`Place ${item.properties.place}`)))
        .catch(this.log)
        .finally(callback);
    });
  });
  
 
vorpal
  .delimiter('equakes$')
  .show();