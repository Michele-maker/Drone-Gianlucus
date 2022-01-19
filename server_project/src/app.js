const express = require('express');
const morgan = require('morgan');
const app = express();
const routes = require('./api/router');
const cors = require('cors');
const errorHandlers = require('./errors');
const droneModel = require('./api/drone/drone.schema');

// connessione a mongo
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/esercitazione_droni', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.set('debug', true);

const mqtt = require('mqtt');
const { json } = require('body-parser');
const host = 'broker.emqx.io';
const port = '1883';
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;

// utilizzo di AMQP

// Funzione di invio
var amqp = require('amqplib/callback_api');

/* amqp.connect('amqps://qakmjopm:tL_k50XFtY7iMBJStupJ5M3d20DubMdB@jackal.rmq.cloudamqp.com/qakmjopm', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'DroneGianlucus/1';
        var msg = 'Ciaone';

        channel.assertQueue(queue, {
            durable: false
        });
        channel.sendToQueue(queue, Buffer.from(msg));

        console.log(" [x] Sent %s", msg);
    })
}); */

//Funzione di ricezione
amqp.connect('amqps://qakmjopm:tL_k50XFtY7iMBJStupJ5M3d20DubMdB@jackal.rmq.cloudamqp.com/qakmjopm', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = 'DroneGianlucus/1';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
        }, {
            noAck: true
        });
    });
});



/* // utilizzo di MQTT
const connectUrl = `mqtt://${host}:${port}`

const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'emqx',
    password: 'public',
    reconnectPeriod: 1000,
});

const topic = 'DroneGianlucus/#'
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
        console.log(`Subscribe to topic '${topic}'`)
    })
});

client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    const obj = JSON.parse(payload.toString())
    droneModel.create(obj);
}); */


app.use(cors());

// body parser
app.use(express.json());

app.use(morgan('tiny'));
app.use('/api', routes);

// error handling
app.use(errorHandlers);

module.exports = app;