const express = require('express');
const constants = require('./common/constants');
const { createPaymentLink, renderHome, renderPaymentPage, renderErrorPage, verifyPayment } = require('./controllers');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('public'));
app.use(express.json());

app.get('/', renderHome);
app.get('/payment-status', renderPaymentPage);
app.get('/error', renderErrorPage);
app.post('/create-payment-link', createPaymentLink);
app.post('/verify-payment', verifyPayment);


app.listen(constants.PORT, () => {
	console.log(`Server is running on port ${constants.PORT}`);
});
