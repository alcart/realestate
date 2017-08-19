import 'reflect-metadata';
import 'zone.js/dist/zone-node';
import {platformServer, renderModuleFactory } from '@angular/platform-server';
import {enableProdMode } from "@angular/core";
import {AppServerModuleNgFactory} from '../dist/ngfactory/src/app/app-server.module.ngfactory'
import {ngExpressEngine} from '@nguniversal/express-engine';
import {AppServerModule} from './app/app-server.module';

import {routes} from './routes.server'

import {join} from 'path';
import {readFileSync} from 'fs';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as nodeMailer from 'nodemailer';
const PORT = process.env.PORT || 58823 || 60123 || 56233;

enableProdMode();

const app = express();
const transporter = nodeMailer.createTransport({
  host: 'n1plcpnl0085.prod.ams1.secureserver.net',
  port: 465,
  secure: true,
  auth: {
    user: 'info@missonimiamicondo.com',
    pass: '7126867Am!'
  }
})
app.use(bodyParser.json());
let template = readFileSync(join(__dirname, 'index.html')).toString();
console.log(__dirname);
app.engine('html', (_, options, callback) => {
  const opts = { document: template, url: options.req.url };

  renderModuleFactory(AppServerModuleNgFactory, opts)
  .then(html => callback(null, html));
});

app.set('view engine', 'html');
app.set('views', __dirname);

app.use(express.static(__dirname, {index: false}));

function ngApp (req, res) {
  res.render(join(__dirname, '/index'), { req, res });
}
app.get('/', ngApp);
routes.forEach(route => {
  app.get(`/${route}`, ngApp);
})
app.get('/nohup.out', (req, res) => {
  console.log('Got Here');
  res.sendFile(join(__dirname, 'nohup.out'));
})
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  var pojo = { status: 404, message: req.baseUrl+","+req.originalUrl };
  var json = JSON.stringify(pojo, null, 2);
  res.status(404).send(json);});

app.post('/api/sendemail', (req, res, next) => {
  let info = req.body;
  let text = "New Interested Client:\nName: "+info.name.toString()+'\n'+"Phone Number: "+info.number.toString()+'\n'+"Email: "+info.email.toString();
  let mailOptions = {
    from: "Missoni Miami Condo <info@missonimiamicondo.com>, ",
    to: ["Adriana Marrero <adrianamiamire@gmail.com>", "Nicolas Barbara <nicolas@barbaraproperty.com>"],
    bcc: ["Adriana ATT <7863253373@txt.att.net>", "Nicolas ATT <6464605718@txt.att.net>"],
    subject: "New Client",
    text: text,
    dsn: {
      id: "just trying",
      return: 'headers',
      notify: ['success','failure','delay'],
      recipient: 'info@missonimiamicondo.com'
    }
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (!error){
      console.log("Message %s sent: %s", info.messageId, info.response);
      res.send("Information sent succesfully");
      next();
    }
    console.log(error);
    res.send("Something went wrong");
    next();
  });
})

var server = app.listen(PORT, () => {
  var host = server.address().address;
  console.log(`Listening on ${host}:`+PORT);
})
