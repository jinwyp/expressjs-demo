

/**
 * Created by JinWYP on 7/27/16.
 */

var express                   = require('express');
var router                    = express.Router();

var orderController = require('../../controllers/apiv1/apidemo');


// define the demo page route
// RESTful API http://mherman.org/blog/2016/03/13/designing-a-restful-api-with-node-and-postgres/

router.get('/orders', orderController.orderList);
router.post('/orders', orderController.orderAdd);
router.post('/orders/error', orderController.orderAddWithError);
router.get('/orders/:id', orderController.orderById);
router.put('/orders/:id', orderController.orderUpdateById);
router.delete('/orders/:id', orderController.orderDelete);



module.exports = router;

