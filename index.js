var spawn = require('child_process').spawn
const lineReader = require('line-reader')

function run(cmd, callback) {
    var spawn = require('child_process').spawn;
    var command = spawn(cmd);
    var result = '';
    command.stdout.on('data', function(data) {
         result += data.toString();
    });
    command.on('close', function(code) {
        return callback(result);
    });
}

var checkList = []
lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(lines) {
    var line = lines.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } )
    if(line[1] == 'CL'){
        var MAC = line[2]
        if(!checkList.includes(MAC)){
            console.log('checking:'+ MAC)
            var cmd = "hcitool name "+MAC
            run(cmd, function(result) { console.log(result)})
            checkList.push(MAC)
        }
    }
})