var spawn = require('child_process').spawn
const lineReader = require('line-reader')

var checkList = []
lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(lines) {
    var line = lines.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } )
    if(line[1] == 'CL'){
        var MAC = line[2]
        if(!checkList.includes(MAC)){
            checkList.push(MAC)
            var hciToolScan = spawn('hcitool', ['name', MAC])
            var result = 'MAC:'+mac+' NAME:'
            hciToolScan.stdout.on('data', function(data) {
                result += data.toString()
            });
            hciToolScan.on("close", function(code) {
                console.log(result)
            })
        }
    }
})