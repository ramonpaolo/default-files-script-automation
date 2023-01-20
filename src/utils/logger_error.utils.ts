/* eslint-disable curly */
import { Request } from 'express'

// Settings
import logger from '../settings/logger.settings'

const loggerError = (error: Error, request?: Request, optional?: object) => {
  if (request != null)
    logger.error({
      request: {
        request_ip: request.ip,
        request_path: request.path,
        request_body: request.body
      },
      error: {
        error_name: error.name,
        error_message: error.message,
        error_stack: error.stack?.split('/n'),
        ...optional
      }
    })
  else
    logger.error({
      error: {
        error_name: error.name,
        error_message: error.message,
        error_stack: error.stack?.split('/n'),
        ...optional
      }
    })
}

export default loggerError