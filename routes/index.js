var express = require('express');
var router = express.Router();

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/PhotoDB',{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('db service connected.')
});


var photoController = require("../controller/photo_controller");

router.get('/', photoController.index);
router.post('/',photoController.upload);

module.exports = router;
