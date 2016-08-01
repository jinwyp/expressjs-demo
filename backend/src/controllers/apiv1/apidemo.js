/**
 * Created by JinWYP on 8/1/16.
 */


exports.orderList = function (req, res, next) {

    return res.send({
        success : true,
        error : null,
        meta : {
            total : 100,
            count : 10,
            offset : 0,
            page : 1
        },
        data : [
            {
                id : 11,
                orderNo : 1001
            },
            {
                id : 12,
                orderNo : 1002
            },
            {
                id : 13,
                orderNo : 1003
            },
            {
                id : 14,
                orderNo : 1004
            },
            {
                id : 15,
                orderNo : 1005
            },
            {
                id : 16,
                orderNo : 1006
            },
            {
                id : 17,
                orderNo : 1007
            },
            {
                id : 18,
                orderNo : 1008
            },
            {
                id : 19,
                orderNo : 1009
            },
            {
                id : 20,
                orderNo : 1010
            }
        ]
    });

};


exports.orderById = function (req, res, next) {

    console.log('Order Id: ', req.params.id);

    return res.send({
        success : true,
        error : null,
        meta : null,
        data : {
            id : 11,
            orderNo : 1001
        }
    });

};


exports.orderAdd = function (req, res, next) {

    //console.log('Cookies: ', req.cookies)

    return res.send({
        success : true,
        error : null,
        meta : null,
        data : {
            id : 11,
            orderNo : 1001
        }
    });

};

exports.orderAddWithError = function (req, res, next) {

    return res.send({
        success : false,
        error : {
            code:1001,
            message: 'Field validation error,  order id length must be 4-30',
            field: 'orderId'
        },
        meta : null,
        data : null
    });

};


exports.orderUpdateById = function (req, res, next) {

    console.log('Order Id: ', req.params.id);

    return res.send({
        success : true,
        error : null,
        meta : null,
        data : {
            id : 11,
            orderNo : 1001
        }
    });

};


exports.orderDelete = function (req, res, next) {

    console.log('Order Id: ', req.params.id);

    return res.send({
        success : true,
        error : null,
        meta : null,
        data : {
            id : 11,
            orderNo : 1001
        }
    });

};