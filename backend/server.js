'use-strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
const app = express();
app.use(bodyParser.json())
app.use(express.json());
app.use(cors())
const connectDb = require('./db/index');
connectDb();

const routes = require('./src/routes/routes');
app.use('/api/v1/notezipper', routes);

app.get('/api/v1/notezipper', (req, res) => {
    return res.send("Hello from API !")
})

app.listen(port, () => {
    console.log('Server is running on port %s', port);
})
