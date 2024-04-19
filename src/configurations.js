const PayOS = require('@payos/node');
const { MongoClient, ServerApiVersion } = require('mongodb');
const constants = require('./constants');

const payos = new PayOS(constants.CLIENT_ID, constants.API_KEY, constants.CHECKSUM_KEY);

const mongoClient = new MongoClient(constants.MONGO_CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = {
  payos,
  mongoClient
}