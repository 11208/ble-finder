const sqlite3 = require('sqlite3').verbose();
 
var MS_PER_MINUTE = 60000;
let db = new sqlite3.Database('/home/pi/blue_hydra/blue_hydra.db')
let START_TIME = (date+"%s") - MS_PER_MINUTE
let STOP_TIME = date +"%s"
let sql = `
    SELECT 
        address, 
        name, 
        vendor, 
        company, 
        manufacturer, 
        classic_mode AS classic, 
        le_mode AS le, 
        le_address_type, 
        updated_at as last_seen, 
        classic_major_class, 
        classic_minor_class, 
        classic_class,
    FROM blue_hydra_devices
    WHERE CAST(strftime('%s',updated_at) AS integer) 
    BETWEEN CAST((${START_TIME} AS integer) AND CAST(${STOP_TIME} AS integer)
`;
 
db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    if(row.name != null && row.classic == 't'){
        console.log(row);
    }
  });
});
db.close();