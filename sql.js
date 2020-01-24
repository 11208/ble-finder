const sqlite3 = require('sqlite3').verbose()
var moment = require('moment')
var args = process.argv;

let filename = '/home/pi/blue_hydra/blue_hydra.db'
function fetchData(){
  console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
  let CURRENT_TIME = moment()
  let STOP_TIME = CURRENT_TIME.unix()
  let START_TIME = CURRENT_TIME.subtract(1, "day").unix()
  let db = new sqlite3.Database(filename, (err) => {
    if (err) {
      console.error(err.message);
    }
  });

  let sql = `SELECT address, name, vendor, company, manufacturer, classic_mode AS classic, le_mode AS le, le_address_type, updated_at, classic_major_class, classic_minor_class, classic_class
    FROM blue_hydra_devices
    WHERE CAST(strftime('%s',updated_at) AS integer) BETWEEN '${START_TIME}' AND '${STOP_TIME}'`;

  db.all(sql, [], (err, rows) => {
    if (!err) {
      rows.forEach((row) => {
        if(row.name != null && row.classic == 't'){
          console.log(row)
        }
      })
    }
    else{
      console.log(err)
    }
  })
  db.close((err) => {
    if (err) {
      return console.error(err.message)
    }
  })
}
function clearData(){
  let db = new sqlite3.Database(filename, (err) => {
    if (err) {
      console.error(err.message)
    }
  });
   
  db.run(`DELETE FROM blue_hydra_devices`, function(err) {
    if (err) {
      return console.error(err.message);
    }
    console.log(`Row(s) deleted ${this.changes}`);
  })
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  })
}

switch(args[2]){
  case "select":
    fetchData()
    break
  case "delete":
    clearData()
    break
  default:
    console.log("no cmd")
    break
}