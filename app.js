var express = require('express')
var mysql = require('mysql');
var path = require('path')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
})

app.post('/todos', function (req, res) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'mytodoapp'
    });

    connection.connect(function (err) {
        if (err) throw err;

        var sql = `INSERT INTO todos (name) VALUES ('${req.body.todo_name}')`;
        connection.query(sql, function (err, result) {
            if (err) throw err;
            res.redirect(req.header('Referer'))
        });
    });
    
})

app.listen(3000);