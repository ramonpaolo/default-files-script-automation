import moongoose from 'mongoose'

// Utils
import loggerError from '../utils/logger_error.utils'

const connection = async () => {
    try {
        const conn = await moongoose.connect('mongo://mongo', {
            pass: '',
            user: ''
        })
        
        return conn
    } catch (error) {
        loggerError(error)
    }
}

export default connection
