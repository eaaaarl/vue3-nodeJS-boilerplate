require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const responseEnhancer = require('./app/middleware/response-filter');
const authRoute = require('./app/routes/auth');
const api = require('./api');
const passport = require('passport');
const path = require('path');
require('./passport')(passport);

const application = express();

const server = http.createServer(application);


application.use(cors());
application.use(express.json());
application.use(bodyParser.json());
application.use(bodyParser.urlencoded({ extended: true }));
application.use(responseEnhancer());
application.use(passport.initialize());

application.use('/api/students', api);
application.use('/api/auth', authRoute);
application.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

const port = process.env.PORT;
application.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
