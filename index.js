var spawn = require('child_process').spawn
const lineReader = require('line-reader')

var checkList = []
lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(lines) {
    var line = lines.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } )
    if(line[1] == 'CL'){
        var MAC = line[2]
        if(!checkList.includes(MAC)){
            console.log('checking:'+ MAC)
            var result = '';
            var hciToolScan = spawn('hcitool', ['name', MAC])
            hciToolScan.stdout.on('data', function(data) {
                result += data.toString();
            });
            hciToolScan.on("close", function(code) {
                console.log('Device name: '+ result)
            })
            checkList.push(MAC)
        }
    }
})