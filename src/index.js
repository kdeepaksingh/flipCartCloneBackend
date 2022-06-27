const express = require('express');
require('dotenv').config();
const userRoutes = require('./routes/user-router');
const categoryRoutes = require('./routes/category-router');
const cartRoutes = require('./routes/cart-router');
const productRoutes = require('./routes/product-router');
const adminRoutes = require('./routes/admin/user-router');
const initialDataRoutes = require("./routes/admin/initialData-router");
const pageRoutes = require("./routes/admin/page-router");
const addressRoutes = require("./routes/address-router");
const orderRoutes = require("./routes/order-routers");
const adminOrderRoute = require("./routes/admin/order-router");
const Razorpay = require('razorpay');
const app = express();
const path = require('path');
const cors = require('cors');
const { products } = require('./paymentData');
require('./db/conn');
const port = process.env.PORT | 5000;
const key_id = 'rzp_test_xIk1TfuzTpwmEh';
const key_secret = 'TOJ5AGEBdhkFXsNCBYiAemVb';
var instance = new Razorpay({
    key_id, key_secret
});

app.get('/products', (req, res) => {
    res.status(200).json({ products });
});
app.get('/order/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find((product) => product.id == productId);
    const amount = product.price * 100 * 70;
    const currency = "INR";
    const receipt = "receipt#123";
    const notes = { desc: product.description };
    instance.orders.create({ amount, currency, receipt, notes }, (error, order) => {
        if (error) {
            return res.status(500).json({ error });
        } else {
            return res.status(200).json({ order });
        }
    });
});

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', userRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);
app.use('/api', initialDataRoutes);
app.use('/api', addressRoutes);
app.use('/api', orderRoutes);
app.use('/api', adminOrderRoute);
app.use('/api', pageRoutes);
app.listen(port, () => {
    console.log(`Server is listening the Port No:https://${port}`);
});



