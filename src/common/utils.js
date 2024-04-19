const constants = require('./constants');
const { mongoClient } = require('./configurations');

async function getOrderCode() {
	let orderCode = parseInt(constants.START_ORDER_CODE);

	try
	{
		await mongoClient.connect();
		orderCode += await mongoClient.db(constants.DB_NAME).collection(constants.COLLECTION_NAME)
			.countDocuments()
			.then((count) => {
				console.log("Get successfully! orderCode: ", count);
				return count;
			});
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

async function insertOrder(order) {
	try
	{
		await mongoClient.connect();
		await mongoClient.db(constants.DB_NAME)
			.collection(constants.COLLECTION_NAME)
			.insertOne({ ...order })
			.then(() => console.log("Insert successfully! orderCode: ", order.orderCode));
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

async function updateOrder(order) {
	if (!order)
	{
		return;
	}

	try
	{
		await mongoClient.connect();
		await mongoClient.db(constants.DB_NAME)
			.collection(constants.COLLECTION_NAME)
			.updateOne({
				orderCode: order.orderCode,
			}, {
				$set: {
					...order,
				},
			})
			.then(() => console.log("Update successfully!", order));
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
	insertOrder,
	updateOrder
}