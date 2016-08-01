/**
 * Created by JinWYP on 8/1/16.
 */


app.post('/process', function(req, res) {

});


exports.orderAdd = function (req, res, next) {

    //console.log('Cookies: ', req.cookies)


    return res.send( {
        msg: 'csrf was required to get here', csrfToken:''
    } )

};