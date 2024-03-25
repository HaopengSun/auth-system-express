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
