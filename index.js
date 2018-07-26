'use strict';

const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
const cors       = require('cors');
const env        = require('./config/env');
const routes     = require('./config/routes');
const path = require("path");
// mongoose.Promise = require('bluebird');
// mongoose.connect(env.db);
mongoose.connect(env.db, { useNewUrlParser: true });
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());


app.use('/api', routes);
app.get('/*', (req, res) => {
const index = path.join(__dirname, 'public', 'index.html');
res.sendFile(index);
});

app.listen(env.port, console.log(`server has started on port: ${env.port}`));
