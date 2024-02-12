import { logger } from '../middlewares/loggerMiddleware.js'

// $ Custom Error Handler Class
export class customErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}

// $ Create ErrorMiddleware Function
export const errorHandlerMiddleware = (err, req, res, next) => {

    // $ Logger setup to print logs in log file

    const loggerData = `timestemp : ${new Date().toString()}, requestUrl : ${req.url}, statusCode : ${err.statusCode}, message : ${err.message}`;

    logger.info(loggerData);

    logger.error(loggerData)

    // $ Check if error is instance of custom error handler

    if (err instanceof customErrorHandler) {
        return res.status(err.statusCode).json(err.message)
    }
    return res.status(500).json("Server Error, Something went wrong. ", err.message)
}