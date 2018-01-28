var CONFIG = require ('./../../gulpconfig');

var express = require ('express');
var app = express ();

app.set('views', CONFIG.SERVER.ROOT)
app.set ('view engine', 'pug');

app.listen (CONFIG.SERVER.PORT);

app.get ('/',function (req, res) {
  res.render ('page/home.pug');
});