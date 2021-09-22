var express = require('express')
var path = require('path')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
    res.sendFile(path.resolve('./index.html'));
})

app.post('/todos', function (req, res) {
    res.send(req.body.todo_name);
})

app.listen(3000);