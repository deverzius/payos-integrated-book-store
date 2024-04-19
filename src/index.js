const express = require('express');
const constants = require('./constants');
const { createPaymentLink } = require('./controllers');

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.post('/create-payment-link', createPaymentLink);


app.listen(constants.PORT, () => {
	console.log(`Server is running on port ${constants.PORT}`);
});
