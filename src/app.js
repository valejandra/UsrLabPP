const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');


const customerRoutes = require('./routes/customer');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(morgan('dev'));


app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'dbcrud'
}, 'single'));

app.use(express.urlencoded({ extended: false }));

app.use('/', customerRoutes);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log('start server on port 3000');
});