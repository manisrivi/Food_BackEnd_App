require('dotenv').config();
const express = require('express');
const mongo = require('./shared/mongodb');
const middleware = require('./shared/middleware');
const routes = require('./routes/index');
const cors  = require("cors");
const stripeRoute = require('./routes/stripe.service');

const PORT = process.env.PORT || 5874
const app = express();

(async()=> {
    try {
        // mongo db
        await mongo.connect();

        // middleware
        app.use(cors());
        app.use(express.json());
        app.use(middleware.logging);
        app.use(middleware.maintenance);
        console.log('middleware initillized successfully');

        // routes
        app.get('/', (req,res)=> res.send('hello world'));
        app.use('/auth', routes.authRoute);
        app.use('/students', routes.studentsRoute);
        app.use('/users', routes.userRoutes);
        app.use('/products', routes.productsRoute);
        app.use('/checkout', stripeRoute);
        app.use('/orders', routes.ordersRoute);
        console.log('routes initillized successfully');

        // port
        app.listen(process.env.PORT, ()=> console.log(`server listening at a ${process.env.PORT}`))
    } catch (error) {
        console.log('error starting application', error.message);
    }
})();