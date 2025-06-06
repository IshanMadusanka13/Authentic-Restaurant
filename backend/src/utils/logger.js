const pino = require('pino');

const transport = pino.transport({
    targets: [
        {
            level: 'trace',
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                translateTime: 'SYS:dd-mm-yyyy HH:MM:ss',
            },
        },
    ],
});

const logger = pino({}, transport);

module.exports = logger;