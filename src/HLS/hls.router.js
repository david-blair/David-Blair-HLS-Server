var router = require('express').Router()
var hls = require('./hls-stream.controller')
// var errorHandling = require('../errorHandling')

router.get('/', hls.getVideo);


module.exports = router