var express = require('express');
var bodyParser = require('body-parser')
var app = express();
const handlebars = require("handlebars")
const cors = require('cors');
const fs = require("fs")
const path = require("path")


var jsonParser = bodyParser.json();
app.use(cors());

  


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

const emailTemplateSource = fs.readFileSync(path.join(__dirname, "/template.hbs"), "utf8")
const template = handlebars.compile(emailTemplateSource)
const emailTemplateSourceNotLogged = fs.readFileSync(path.join(__dirname, "/templateNotLogged.hbs"), "utf8")
const templateNotLogged = handlebars.compile(emailTemplateSourceNotLogged)

async function run(htmlToSend, recievers){
    const mailSent = await transporter.sendMail({
        subject: 'Oportunidade de Venda!',
        from: 'concierge@portobello.com.br',
        to: recievers,
        html: htmlToSend,
        attachments: [{
            filename: 'image1.png',
              path: __dirname +'/images/image1.png',
             cid: 'image1'
      }]
    })
    return (mailSent)
}

async function runNotLogged(htmlToSend, recievers){


    const mailSent = await transporter.sendMail({
        subject: 'Oportunidade de um novo cliente!',
        from: 'concierge@portobello.com.br',
        to: recievers,
        html: htmlToSend,
        attachments: [{
            filename: 'image1.png',
              path: __dirname +'/images/image1.png',
             cid: 'image1'
      }]
    })
    return (mailSent)
}


// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
    res.send('alive')
});

app.post('/sendEmail', jsonParser, function(req, res) {
    const data = (req.body)
    const {recievers} = req.body
    console.log(data)
    const htmlToSend = template(data)
    const mailResponse = run(htmlToSend, recievers)
    res.send(mailResponse)
})

app.post('/sendEmailNotLogged', jsonParser, function(req, res) {
    const data = (req.body)
    const {recievers} = req.body
    console.log(data)
    const htmlToSend = templateNotLogged(data)
    const mailResponse = runNotLogged(htmlToSend, recievers)
    res.send(mailResponse)
})

app.listen(process.env.PORT || 8080);
console.log("Server listening on port 8080")