/**
 * Created by gbox3d on 2014. 9. 30..

 npm install mysql


 */

var mysql = require( 'mysql');


var mysql_config = {

    host: "192.168.9.177",
    port: "3306",
    user: "root",
    password: "5874",
    database: "mts"
};



var connection = mysql.createConnection(mysql_config);

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected success as id ' + connection.threadId);

    connection.end();

});


