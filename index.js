var spawn = require('child_process').spawn
const { exec } = require("child_process");
const lineReader = require('line-reader')

function hciToolScan(mac) {
    return new Promise((resolve, reject) => {
        var command = spawn('hcitool', ['name ', mac])
        var result = ''
        command.stdout.on('data', (data) => {
             result += data.toString()
        })
        command.on('close', (code) => {
            resolve(result)
        })
        command.on('error', (err) => { 
            reject(err) 
        })
    })
}

var checkList = []
lineReader.eachLine('/home/pi/blue_hydra/blue_hydra_rssi.log', function(lines) {
    var line = lines.split(/(\s+)/).filter( function(e) { return e.trim().length > 0; } )
    if(line[1] == 'CL'){
        var MAC = line[2]
        if(!checkList.includes(MAC)){
            console.log('checking:'+ MAC)
            hciToolScan(MAC)
            .then((response) => {
                console.log('response:'+ response)
            })
            .catch((error) => {
                console.log(error)
            })
            checkList.push(MAC)
        }
    }
})