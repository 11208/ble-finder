const sqlite3 = require('sqlite3').verbose()
var moment = require('moment')

let CURRENT_TIME = moment()
let STOP_TIME = CURRENT_TIME.unix()
let START_TIME = CURRENT_TIME.subtract(1, "minute").unix()

let sql = `SELECT address, name, vendor, company, manufacturer, classic_mode AS classic, le_mode AS le, le_address_type, updated_at, classic_major_class, classic_minor_class, classic_class
    FROM blue_hydra_devices
    WHERE CAST(strftime('%s',updated_at) AS integer)  
    BETWEEN ${START_TIME} AND ${STOP_TIME}`

function fetchData(){
  console.log('\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\')
  let db = new sqlite3.Database('/home/pi/blue_hydra/blue_hydra.db')
  db.all(sql, [], (err, rows) => {
    if (!err) {
      rows.forEach((row) => {
        if(row.name != null && row.classic == 't'){
          console.log(row.name, row.updated_at)
        }
      })
    }
    else{
      console.log(err)
    }
  })
  db.close()
  setTimeout(fetchData, 5000);
}
fetchData()