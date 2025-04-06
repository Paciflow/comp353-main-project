const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
var bodyParser = require('body-parser');
const port = 3000;

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var db;

app.get('/', (req, res) => {
    return res.json("hi");
});

app.post('/connect', (req, res) => {
    db = mysql.createConnection({
        host: "vqc353.encs.concordia.ca",
        port: "3306",
        user: req.body.user,
        password: req.body.password,
        database: "vqc353_4"
    });
    db.connect((err) => {
        if (err) {console.error(err); return res.status(500).json(err)}
        console.log("Connected!");
        return res.json(200);
    });
});

app.post('/query', (req, res) => {
    const SQL = req.body.query;
    console.log(SQL)
    db.query(SQL, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.get('/users', (req, res) => {
    const SQL = "SELECT * FROM users";
    db.query(SQL, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});

app.listen(port, () => {
    console.log("listening on port " + port)
})