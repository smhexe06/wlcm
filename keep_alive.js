var http = require('http');

http.createServer(function (req, res){
  res.write("İSMAİL");
  res.end();
}).listen(8080);