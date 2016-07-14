/**
 * Created by gbox3d on 2014. 9. 30..
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

//INSERT INTO `korcow`.`test` (`id`, `name`) VALUES ('', 'kim');

connection.query('SELECT * from gameplay;', function(err, rows) {
    // connected! (unless `err` is set)

    console.log(rows);

    connection.end();
});