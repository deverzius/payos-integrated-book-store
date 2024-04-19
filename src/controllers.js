const { payos } = require('./common/configurations');
const utils = require('./common/utils');
const { INCREASED_AMOUNT_OF_ORDER_CODE, ORDER_STATUS } = require('./common/constants');

async function renderHome(req, res) {
	res.render('index');
}

async function renderPaymentPage(req, res) {
	res.render('payment');
}

async function renderErrorPage(req, res) {
	res.render('error');
}

async function createPaymentLink(req, res) {
	const origin = req.header('Referer');

	const order = {
		amount: 10000,
		description: 'Thanh toan sach',
		orderCode: await utils.getOrderCode() + INCREASED_AMOUNT_OF_ORDER_CODE,
		returnUrl: origin + 'payment-status',
		cancelUrl: origin + 'payment-status',
	}

	await payos.createPaymentLink(order)
		.then((paymentLink) => {
			utils.insertOrder({
				orderCode: paymentLink.orderCode,
				amount: paymentLink.amount,
				description: paymentLink.description
			});
			res.redirect(303, paymentLink.checkoutUrl);
		})
		.catch((error) => {
			console.log(error);
			res.render('error');
		});
}

async function verifyPayment(req, res) {
	const orderCode = req.body.orderCode;
	const paymentLinkInfo = await payos.getPaymentLinkInformation(orderCode);

	if (paymentLinkInfo.status === ORDER_STATUS.PAID)
	{
		res.json({
			status: ORDER_STATUS.PAID,
			link: 'https://drive.google.com/file/d/1DaoW9CH7ri29mHZ5Qtxl6uMo-wH3X4ol/view'
		})
		return;
	}
	res.json({ status: paymentLinkInfo.status });
}

module.exports = {
	createPaymentLink,
	renderHome,
	renderPaymentPage,
	renderErrorPage,
	verifyPayment
}