import { createLogger, format, transports } from 'winston';
import { NextFunction, Request, Response } from 'express';

const logger = createLogger({
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.json()
    ),
    transports: [new transports.Console()]
});

const loggerMiddleware = () => {
    return (request: Request, response: Response, next: NextFunction) => {
        const message = `Method: ${request.method}, URL: ${request.url}, Params: ${JSON.stringify(request.params)}, Query data: ${JSON.stringify(request.query)}`;
        logger.info(message);

        next();
    };
};

export default loggerMiddleware;
