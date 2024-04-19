require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const API_KEY = process.env.API_KEY;
const CHECKSUM_KEY = process.env.CHECKSUM_KEY;
const PORT = process.env.PORT || 8080;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.COLLECTION_NAME;
const START_ORDER_CODE = process.env.START_ORDER_CODE;

module.exports = {
	CLIENT_ID,
	API_KEY,
	CHECKSUM_KEY,
	PORT,
	MONGO_CONNECTION_STRING,
	DB_NAME,
	COLLECTION_NAME,
	START_ORDER_CODE
}