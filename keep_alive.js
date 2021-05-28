var http = require('http');

http.createServer(function (req, res){
  res.write("deniz");
  res.end();
}).listen(8080);