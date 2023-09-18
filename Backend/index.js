const Connect = require('./db.config/db.config');
Connect();
const express = require('express');
const cors=require('cors')
const bodyparser = require('body-parser');
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
const port = process.env.port || 4000;
const adminroutes = require('./src/router/Admin.router');
app.use('/api/admin', adminroutes);
const productroutes = require('./src/router/Product.router');
app.use('/api/product', productroutes);
app.listen(port, async (err) => {
    try {
        if (err) throw err;
        console.log(`Server is running at the port ${port}`);
    } catch (error) {
        return await console.log({ Message: 'Port Error', Error: error.message });
    }
})