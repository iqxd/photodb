var express = require('express');
var router = express.Router();

var photoController = require("../controller/photo_controller");

router.get('/',photoController.show);

module.exports = router;