import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { Request, Response } from "express";
import * as _ from "lodash";
import { Logger } from "nestjs-pino";

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}
  catch(err: Error | HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const request = host.switchToHttp().getRequest<Request>();

    this.logger.error(
      { err, request: _.pick(request, ["body", "headers"]) },
      undefined,
      `App exception occurs: ${err.message}`
    );

    if (!!err && err instanceof HttpException) {
      return response.status(err.getStatus()).json(err.getResponse());
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
}
