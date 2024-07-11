const { Router } = require("express");
const router = Router();

const studentRoute = require('./app/routes/studentRoute');

router.use('/', studentRoute);

module.exports = router;
