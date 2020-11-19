var router = require('express').Router()
var hls = require('./hls-stream.controller')
// var errorHandling = require('../errorHandling')

// this routes all get traffic to whichever hls version is implimented.
router.get('/', hls.getVideo);


module.exports = router