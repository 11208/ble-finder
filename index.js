var spawn = require('child_process').spawn
const lineReader = require('line-reader')

lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(lines) {
    var line = lines.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } )
    if(line[1] == 'CL'){
        var hciToolScan = spawn('hcitool', ['name', line[2]])
        hciToolScan.stdout.on('data', function(data) {
            console.log('Found device: ' + data)
          });
          hciToolScan.on("exit", function(code) {
            // console.log('done',"hcitool scan: exited (code " + code + ")")
        })
    }
})