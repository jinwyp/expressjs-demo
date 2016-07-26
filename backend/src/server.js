/**
 * Created by JinWYP on 7/26/16.
 */


const express = require('express');
const app = express();


const config = require('./config');

console.log(config);

app.listen(3000, function() {
    console.log('----- NodeJS Server started on 3000')
});