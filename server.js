const path = require('path');

var express = require('express');
var app = express();

// Serve Static Content
app.use(express.static(__dirname + './'));

app.get('/batching', function (request, response, next) {
    console.log("batching route hit");
    response.sendFile(path.join(__dirname + '/batching/batching.html'));
});

app.get('*', function (request, response, next) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(9000, function() {
    console.log('Server listening to 9000 port.');
});
