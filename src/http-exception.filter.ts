import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common'
import { Request, Response } from 'express'
import { RollbarHandler } from 'nestjs-rollbar'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    @RollbarHandler({ rethrow: true })
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const request = ctx.getRequest<Request>()
        const status = exception.getStatus()

        response.status(status).json({
            statusCode: status,
            timestamp: new Date().toISOString(),
            path: request.url
        })
    }
}
