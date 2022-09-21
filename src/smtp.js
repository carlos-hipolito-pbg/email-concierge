require('dotenv').config()

var HOST = process.env.HOST
var PORTs = process.env.PORTs
var USER = process.env.USER
var PASS = process.env.PASS

module.exports = {
    host: 'smtp-relay.gmail.com',
    port: PORTs,
    user: USER,
    pass: PASS
}