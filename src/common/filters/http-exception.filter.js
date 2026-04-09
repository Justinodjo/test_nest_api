'use strict';

const { Catch, HttpException, HttpStatus, Logger } = require('@nestjs/common');

class HttpExceptionFilter {
  constructor() {
    this.logger = new Logger(HttpExceptionFilter.name);
  }

  catch(exception, host) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const exceptionResponse =
      exception instanceof HttpException ? exception.getResponse() : null;

    const message =
      exceptionResponse && typeof exceptionResponse === 'object' && exceptionResponse.message
        ? exceptionResponse.message
        : exception.message || 'Erreur interne du serveur';

    const errorBody = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error:
        exceptionResponse && typeof exceptionResponse === 'object' && exceptionResponse.error
          ? exceptionResponse.error
          : HttpStatus[status],
    };

    this.logger.warn(
      `[${request.method}] ${request.url} → ${status}: ${JSON.stringify(message)}`,
    );

    response.status(status).json(errorBody);
  }
}

Catch(HttpException)(HttpExceptionFilter);

module.exports = { HttpExceptionFilter };
