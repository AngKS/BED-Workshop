var mysql = require('mysql');

var dbconnect = {
    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "dev",
            password: "dev123",
            database: "userDatabase"
        });
        return conn;
    }
};

module.exports = dbconnect