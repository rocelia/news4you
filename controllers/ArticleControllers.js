// Node Dependencies
var express = require('express');
var router = express.Router();


var Article = require('../models/article.js');


router.get("/", function(req, res) {
 res.sendfile(process.cwd() + "/public/index.html");
});



module.exports = router;
