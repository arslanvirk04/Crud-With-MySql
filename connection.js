
const mysql = require ("mysql");

var mysqlConnection = mysql.createConnection({
    host :"localhost",
    port :"3307",
    user: "root",
    password:"password",
    database :"book_record",
    multipleStatements :true
     
 });
 
 mysqlConnection.connect((err) => {
     if (!err)
     {
          console.log('connected successfully');
     }
     else 
     {
         console.log('connected failed' +JSON.stringify(err, undefined,2))
         //console.log(err)
     }
     })

     module.exports = mysqlConnection;