/* eslint-disable curly */
import { Request } from 'express'

import logger from '../settings/logger.settings'

const loggerError = (error: Error, request?: Request) => {
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
        error_stack: error.stack?.split('/n')
      }
    })
  else
    logger.error({
      error: {
        error_name: error.name,
        error_message: error.message,
        error_stack: error.stack?.split('/n')
      }
    })
}

export default loggerError