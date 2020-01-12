const keyPublishable = 'pk_test_fjMwdfhvyr7Ywn2lSJgYM5w600wrhbCzzZ';
const keySecret = 'sk_test_VAM7DuZfUO8UXzProtgsX8ER00d0XLkyTr';

const app = require('express')();
const stripe = require('stripe')(keySecret);
const pug = require('pug');
const path = require('path');

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get("/", ((req, res) => {
    res.render("index", { keyPublishable: keyPublishable });
}));

app.post("/pay", function(req, res) {
    let amount = 10 * 100;

    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    })
    .then(customer => 
        stripe.charge({
            amount, 
            description: 'Sample Charge',
            currency: 'EUR',
            customer: customer.id
        }))
    .then(charge => res.render("pay"));
});

app.listen(3000, () => {
    console.log('server is running on port 3000');
});