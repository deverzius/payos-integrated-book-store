const constants = require('./constants');
const { mongoClient } = require('./configurations');

async function getOrderCode() {
	let orderCode = constants.START_ORDER_CODE;

	try
	{
		await mongoClient.connect();
		orderCode += await mongoClient.db(constants.DB_NAME).collection(constants.COLLECTION_NAME).countDocuments();
		console.log("Query successfully!");
	}
	catch (error)
	{
		console.log(error);
	}
	finally
	{
		await mongoClient.close();
	}

	return orderCode;
}

async function insertOrder(orderCode) {
	try
	{
		await mongoClient.connect();
		await mongoClient.db(constants.DB_NAME)
			.collection(constants.COLLECTION_NAME)
			.insertOne({ orderCode: orderCode + constants.START_ORDER_CODE });
		console.log("Query successfully!");
	}
	catch (error)
	{
		console.log(error);
	}
	finally
	{
		await mongoClient.close();
	}
}

module.exports = {
	getOrderCode,
	insertOrder
}