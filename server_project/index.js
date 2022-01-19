const app = require('./src/app');

app.listen(8011, () => console.log('app listening on port: 8011'));


// use coap
const coap = require('coap')
const server = coap.createServer()

server.on('request', (req, res) => {
  res.end('Gatto')
}) 

// the default CoAP port is 5683
server.listen(5683)