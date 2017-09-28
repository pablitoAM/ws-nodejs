
const PORT = 8000;

console.log(`Server started on port: ${PORT}`);

let rate = 50;
let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({port: PORT});
wss.on('connection', function(ws) {        
    ws.on('message', function(message) {
        console.log('Received from client: %s', message);
        if(isNumeric(message)){
            refreshRate(message);
        }
        broadcast(rate);        
    });
});

function broadcast(data){
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
}

function refreshRate(data){
    rate += Number(data);
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}