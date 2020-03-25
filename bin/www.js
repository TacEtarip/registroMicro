require('dotenv').config();

import http from 'http';

import preconfig from '../config/index';

import app from '../server/service';

const config = preconfig[process.env.NODE_ENV];

const PORT = process.env.PORT;

const log = config.log();

app.set('port', PORT);

const server = http.createServer(app);

server.listen(PORT || 9090);

server.on('listening', () => {
    log.info(
      `Hi there! I'm listening on port ${server.address().port} in ${app.get('env')} mode.`,
    );
  });