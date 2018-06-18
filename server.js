// server.js file
var express = require('express');
var app = express();

//set the view engine to base on ejs
app.set('view engine','ejs');

//public directory to store assets in
app.use(express.static(__dirname + '/public'));

//routes for the app
app.get('/',function(req, res){
  res.render('pad');
});

app.get('/(:id)',function(req, res){
  res.render('pad');
});

//get shareJS dependencies
var sharejs = require('share');

// set up redis server
var redisClient;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redisClient = require("redis").createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = require("redis").createClient();
}



//options for shareJS
var options = {
  db: {type: 'redis', client: redisClient},
};

//attach the express server to shareJS
sharejs.server.attach(app, options);

//listen on port 8000 (for localhost) or the port defined for heroku
// var port = process.env.PORT || 8000;
// app.listen(port);
app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
