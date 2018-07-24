const express = require('express');
// const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
const logger = require('morgan');
var path = require('path');
// const routes = require("./routes");
//require all models

// var User = require('./models/user');
// var Article = require('./models/article');
// var Index = require('./models/index');

// app.use(routes);

mongoose.promise = Promise;

const PORT = process.env.PORT || 3001;

const app = express();
app.use(logger('dev'));
const router = express.Router();

app.use(bodyParser.json("public"));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://newuser123:newuser123@ds147411.mlab.com:47411/news4you');

// app.use(function (req, res) {
//     res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.use(express.static('./client/build'))
// app.get("/sports", function (req, res) {
//     ///bleacher reaport
//     console.log('Scraping Bleacher Report\n==================================================');

//     var bleacherReportArticles = [];

//     request("https://bleacherreport.com", (error, response, html) => {
//         var $ = cheerio.load(html)

//         $('.articleSummary').each(function () {
//             var title = $(this).children('.commentary').children('h3').text();
//             // console.log(title);
//             var img = $(this).children('.articleMedia').children('a').children('img').attr('src');
//             // console.log(img);
//             var link = $(this).children('.articleMedia').children('a').attr('href');
//             // console.log(link);
//             var newArticle = {
//                 title: title,
//                 img: img,
//                 link: link
//             }
//             bleacherReportArticles.push(newArticle);

//         });

//         console.log(bleacherReportArticles);
//         this.setState({ data: bleacherReportArticles }, () => console.log(this.state));
//     });
// });

app.listen(PORT, () => console.log(`Running on ${PORT}`));