const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Parse URL-encoded bodies (form data)
app.use(bodyParser.urlencoded({ extended: true }));

// Use router middleware
app.use('/', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// In development environment
if (process.env.NODE_ENV === 'development') {
    const webpack = require('webpack');
    const webpackDevMiddleware = require('webpack-dev-middleware');
    const webpackHotMiddleware = require('webpack-hot-middleware');
    const config = require('./webpack.config.js');

    const compiler = webpack(config);

    app.use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath
    }));

    app.use(webpackHotMiddleware(compiler));
}