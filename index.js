const lineReader = require('line-reader');

lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(lines) {
    var line = lines.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } );
    if(line[1] == 'CL'){
        console.log(line[2])
    }
});