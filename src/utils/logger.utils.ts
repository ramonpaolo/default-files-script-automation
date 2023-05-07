/* eslint-disable curly */
import { Request } from 'express'

// Settings
import logger from '../settings/logger.settings'

const env = process.env.NODE_ENV

const loggerError = (error: Error, request?: Request, optional?: object) => {
  if (request != null) {
    const ipV4 = request.ip.split(':').pop()

    return logger.error({
      request: {
        request_ip: {
          request_ip_v4: ipV4,
        },
        request_id: request.header('x-request-id'),
        request_path: request.path,
        request_body: request.body
      },
      env,
      error: {
        error_name: error.name,
        error_message: error.message,
        error_stack: error.stack?.split('\n'),
        ...optional
      }
    })
  }

  return logger.error({
    error: {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack?.split('\n'),
      ...optional
    },
    env,
  })
}

const loggerInfo = (message: string, optional?: object, request?: Request) => {
  if (request === undefined) return logger.info({
    status: 'success',
    message,
    env,
    ...optional
  })

  const ipV4 = request.ip.split(':').pop()
  return logger.info({
    status: 'success',
    message,
    env,
    ...optional,
    request: {
      request_ip: {
        request_ip_v4: ipV4,
      },
      request_id: request.header('x-request-id'),
      request_path: request.path,
      request_body: request.body,
    },
  })
}

export {
  loggerInfo,
  loggerError,
}