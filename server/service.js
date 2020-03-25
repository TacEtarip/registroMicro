require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import preconfig from '../config/index';

import ServiceRegistry from './lib/ServiceRegistry';

const config = preconfig[process.env.NODE_ENV];

const log = config.log();

const app = express();

const serviceRegistry = new ServiceRegistry(log);


app.use(compression());
app.use(helmet());

app.options('*', cors({credentials: true, origin: true}));
app.use(cors({credentials: true, origin: true}));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));

if (app.get('env') === 'development') {
    app.use((req, res, next) => {
      log.debug(`${req.method}: ${req.url}`);
      return next();
    });
}

app.put('/register/:servicename/:serviceversion/:serviceport', (req, res) => {
    const { servicename, serviceversion, serviceport } = req.params;

    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    const serviceKey = serviceRegistry
      .register(servicename, serviceversion, serviceip, serviceport);
    return res.json({ result: serviceKey });
  });

  app.delete('/register/:servicename/:serviceversion/:serviceport', (req, res) => {
    const { servicename, serviceversion, serviceport } = req.params;

    const serviceip = req.connection.remoteAddress.includes('::') ? `[${req.connection.remoteAddress}]` : req.connection.remoteAddress;

    const serviceKey = serviceRegistry
      .unregister(servicename, serviceversion, serviceip, serviceport);
    return res.json({ result: serviceKey });
  });

  app.get('/find/:servicename/:serviceversion', (req, res) => {
    const { servicename, serviceversion } = req.params;
    const svc = serviceRegistry.get(servicename, serviceversion);
    if (!svc) return res.status(404).json({ result: 'Service not found' });
    return res.json(svc);
  });

  // eslint-disable-next-line no-unused-vars
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

export default app;