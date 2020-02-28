/**
* worker.js
*/
const env = (process.env && process.env.NODE_ENV) ? process.env.NODE_ENV : 'development';
var amqp = require('amqplib/callback_api');
var config = require('../config/config')[env];
const curl = new (require( 'curl-request' ))();
var request = require('request');

const rabbitmq_config = (config.rabbitmq) ? config.rabbitmq : {
  "host": "amqp://localhost",
  "queues": {
    "generateBundles": "marabout.generateBundles"
  }
};


var amqpConn = null;

function start() {
  amqp.connect(rabbitmq_config.host + "?heartbeat=60", function(err, conn) {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(start, 7000);
    }
    conn.on("error", function(err) {
      if (err.message !== "Connection closing") {
        console.error("[AMQP] conn error", err.message);
      }
    });
    conn.on("close", function() {
      console.error("[AMQP] reconnecting");
      return setTimeout(start, 7000);
    });

    console.log("[AMQP] connected");
    amqpConn = conn;

    whenConnected();
  });
}

function whenConnected() {
  startWorker();
}

// A worker that acks messages only if processed succesfully
function startWorker() {
  amqpConn.createChannel(function(err, ch) {
    if (closeOnErr(err)) return;
    ch.on("error", function(err) {
      console.error("[AMQP] channel error", err.message);
    });
    ch.on("close", function() {
      console.log("[AMQP] channel closed");
    });
    ch.prefetch(1);
    ch.assertQueue(rabbitmq_config.host, { durable: true }, function(err, _ok) {
      if (closeOnErr(err)) return;
      ch.consume(rabbitmq_config.queues.generateBundles, processMsg, { noAck: false });
      console.log("Worker is started");
    });

    function processMsg(msg) {
      var incomingDate = (new Date()).toISOString();
      const bundle_data = JSON.parse(msg.content.toString());

      sendGenerateBundle(bundle_data, function(ok) {
        console.log("Sending Ack for msg at time " + incomingDate);
        try {
          if (ok)
            ch.ack(msg);
          else
            ch.reject(msg, true);
        } catch (e) {
          closeOnErr(e);
        }
      });

    }
  });
}

function sendGenerateBundle(bundle_data, callback) {
  var options = {
    uri: config.appBaseUrl + "/api/bundle/generateBundle",
    method: 'POST',
    json: true,
    body: {'bundle' : bundle_data}
  };
  request(options, function (error, response, body) {
    if (body && body.success) {
      callback(true);
    } else {
      callback(false);
    }
  });
}

function closeOnErr(err) {
  if (!err) return false;
  console.error("[AMQP] error", err);
  amqpConn.close();
  return true;
}

start();

