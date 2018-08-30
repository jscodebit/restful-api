/*const a = '100';
const b = 'Hello';
const c = require('./hello.js');
//const d = require('./hello2.js');
const http = require('http');
const fs = require('fs');
const site = http.createServer(function(req, res){
    //console.log("Hello World!!!");
    fs.readFile('test.json', function(error, data){
        let holder = JSON.parse(data);
        res.setHeader('Content-Type', 'application/json');
        res.write('<h2>Hello world!!</h2>');
        console.log("Welcome to my page");
        console.log(data);
        res.write(data);
        res.end();
    });
});
console.log(a+b);
console.log(c);
console.log(d);
site.listen(4000);*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./helper/datasim.js');
const data = db.data;
console.log(__dirname);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname+'/public'));
app.use(function(req, res, next){
    console.log("I am in the middle of");
    //console.log(req.body);
    next();
})

app.get('/users', function(req, res){
    console.log(req.body);
    //res.send('<h1>GET sent</h1>');
    res.json(data);
})
app.post('/users', function(req, res){
    console.log('data length',data.users.length);
    req.body.id = Math.floor(Date.now());
    data.users.push(req.body);
    console.log(req.body);
    res.send('<h1>POST sent</h1>');
})
app.post('/users/:id', function(req, res){
    console.log(req.body);
    res.send('<h1>POST sent</h1>');
})
app.get('/users/:id', function(req, res){
    console.log(req.params);
    res.send(db.getRecord(req.params.id));
})
app.put('/users/:id', function(req, res){
    console.log(req.params.id);
    console.log(req.body);
    req.body.id = req.params.id;
    let id = db.findID(data.users, req.params.id);
    console.log("id ",id);

    if(id != -1) {
        data.users[id] = req.body;
    } else {
        res.write('Record not found');
    }
    console.log(data.users);
    res.send();
})
app.delete('/users/:id', function(req, res){
    console.log(req.params);
    let id = db.findID(data.users, req.params.id);
    console.log('temp',id);
    if(id != -1) {
        data.users.splice(id, 1);
        res.write('Deleted the record '+ req.params.id);
    } else {
        res.write('Record not found');
    }
    console.log(id);
    console.log("req.body", data.users);
    res.send();
})
app.listen(4000)


