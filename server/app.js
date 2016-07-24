var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/solo_project';

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

      var q = "INSERT INTO players (name, position, team, bye, adp) VALUES ('" + req.body.Name + "', '" + req.body.Position + "','" + req.body.Team + "', '" + req.body.Bye + "', '" + req.body.AverageDraftPosition + "')";

      console.log( "q: " + q );
      client.query( q );
      done();
      res.send(true);
    }
  });
});
