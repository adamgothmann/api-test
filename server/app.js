var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var connectionString = 'postgres://hmjdomjolyizcc:GMyFYo2RyHT8W-AW1jnippnPhm@ec2-54-243-203-98.compute-1.amazonaws.com:5432/d6fdol6lt5p8g1';

pg.defaults.ssl = true;

app.listen(3000, 'localhost', function(){
  console.log('listening on 3000');
});

app.get('/', function(req, res){
  res.sendFile(path.resolve('views/index.html'));
});

app.use(express.static('public'));

app.post('/sendToDb', urlencodedParser, function(req, res){
  console.log(req.body);
  pg.connect(connectionString, function (err, client, done) {
    if( err ){
      console.log( err );
    }
    else{
      // var namer = cleanString( req.body.Name );

      var q = "INSERT INTO players (name, position, team, adp) VALUES ('" + req.body.Name + "', '" + req.body.Position + "','" + req.body.Team + "', '" + req.body.AverageDraftPosition + "')";

      console.log( "q: " + q );
      client.query( q );
      done();
      res.send(true);
    }
  });
});
