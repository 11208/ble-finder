var Tail = require('always-tail');
var fs = require('fs');
var filename = "/home/pi/blue_hydra/blue_hydra_rssi.log";
 
if (!fs.existsSync(filename)) fs.writeFileSync(filename, "");
var mb = 1024 * 1024
var options = {
    blockSize: 20*mb
}
var tail = new Tail(filename, '\n', options);
 
tail.on('line', function(data) {
  console.log("got line:", data);
});
 
 
tail.on('error', function(data) {
  console.log("error:", data);
});
 
tail.watch();