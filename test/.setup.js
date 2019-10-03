require("babel-register");

const http = require('http');
const mockserver = require('mockserver');
 
http.createServer(mockserver('./test/mocks')).listen(3001);