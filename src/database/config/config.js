/* eslint-disable no-undef */
const { config } = require('dotenv')

config()

const { POSTGRES_DATABASE, POSTGRES_USERNAME, POSTGRES_PASSWORD, POSTGRES_HOST } = process.env

module.exports = {
  'test': {
    'username': POSTGRES_USERNAME,
    'password': POSTGRES_PASSWORD,
    'database': POSTGRES_DATABASE,
    'host': POSTGRES_HOST,
    'dialect': 'postgres',
    'logging': false,
  },
  'development': {
    'username': POSTGRES_USERNAME,
    'password': POSTGRES_PASSWORD,
    'database': POSTGRES_DATABASE,
    'host': POSTGRES_HOST,
    'dialect': 'postgres',
    'logging': false,
  },
  'staging': {
    'username': POSTGRES_USERNAME,
    'password': POSTGRES_PASSWORD,
    'database': POSTGRES_DATABASE,
    'host': POSTGRES_HOST,
    'dialect': 'postgres',
    'logging': false,
    'dialectOptions': {
      'ssl': {
        'require': false,
        'rejectUnauthorized': false,
      }
    }
  },
  'production': {
    'username': POSTGRES_USERNAME,
    'password': POSTGRES_PASSWORD,
    'database': POSTGRES_DATABASE,
    'host': POSTGRES_HOST,
    'dialect': 'postgres',
    'dialectOptions': {
      'ssl': {
        'require': false,
        'rejectUnauthorized': false,
      }
    }
  },
}
