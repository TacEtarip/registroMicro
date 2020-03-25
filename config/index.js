import bunyan from 'bunyan';

import pjs from '../package.json';

const { name, version } = pjs;

const getLogger = (name, version, level) => bunyan.createLogger({name: `${name}:${version}`, level });

const config = {
    development: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'debug'),
      },
    production: {
        name,
        version,
        serviceTimeout: 30,
        log: () => getLogger(name, version, 'info'),
    },
};

export default config;