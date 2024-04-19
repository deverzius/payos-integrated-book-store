const { payos } = require('./configurations');
const utils = require('./utils');

async function createPaymentLink(req, res) {
	const origin = req.header('Referer');

	const order = {
		amount: 10000,
		description: 'Thanh toan sach',
		orderCode: utils.getOrderCode(),
		returnUrl: origin + 'success.html',
		cancelUrl: origin + 'cancel.html',
	}

	await payos.createPaymentLink(order)
		.then((paymentLink) => {
			utils.insertOrder(order.orderCode + 1);
			res.redirect(303, paymentLink.checkoutUrl);
		})
		.catch((error) => {
			console.log(error);
			res.redirect(400, origin + 'error.html');
		});
}


module.exports = {
	createPaymentLink
}