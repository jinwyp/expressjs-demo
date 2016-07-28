

/**
 * Created by JinWYP on 7/27/16.
 */

var express                   = require('express');
var router                    = express.Router();

var pageDemoController = require('../../controllers/page/pagedemo');

// define the demo page route
router.get('/rgbToHex', pageDemoController.rgbToHex);
router.get('/hexToRgb', pageDemoController.hexToRgb);



module.exports = router;

