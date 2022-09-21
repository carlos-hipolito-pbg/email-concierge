var express = require('express');
var app = express();
const cors = require('cors')

app.use(cors())
const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const SMTP_CONFIG = require('./src/smtp')
require('dotenv').config()
const transporter = nodemailer.createTransport({
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: false,
    auth: {
        user: SMTP_CONFIG.user,
        pass: SMTP_CONFIG.pass,
    },
    tls:{
        rejectUnauthorized: false,
    },
})

transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './views/'
}))

async function run(){
    const mailSent = await transporter.sendMail({
        text: 'Teste',
        subject: 'Oportunidade de venda!',
        from: 'concierge@portobello.com.br',
        to: 'carlos.hipolito@portobello.com.br',
        template: 'index',
    })
    console.log(mailSent)
}





// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('hello world')
});

app.post('/sendEmail', function(req, res) {
    run()
    res.send('email enviado')
})

app.listen(process.env.PORT || 8080);