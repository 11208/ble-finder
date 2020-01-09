const lineReader = require('line-reader');

lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(line) {
    console.log(line);
});