require('dotenv').config()

var HOST = process.env.HOST
var PORT = process.env.PORT
var USER = process.env.USER
var PASS = process.env.PASS

module.exports = {
    host: 'smtp-relay.gmail.com',
    port: PORT,
    user: USER,
    pass: PASS
}