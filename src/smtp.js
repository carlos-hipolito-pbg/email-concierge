require('dotenv').config()

var HOST = process.env.HOST
var PORTs = process.env.PORTs
var USER = process.env.USER
var PASS = process.env.PASS

module.exports = {
    host: HOST,
    port: 587,
    user: USER,
    pass: PASS
}