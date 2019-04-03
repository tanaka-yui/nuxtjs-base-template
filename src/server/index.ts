import basicAuth from 'basic-auth-connect'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import dotenv from 'dotenv'
import helmet from 'helmet'

import session from './middleware/session'
import routes from './api'

dotenv.config()

const app = express()

if (process.env.BASIC_AUTH_ENABLE === 'true') {
  app.use(
    basicAuth(process.env.BASIC_AUTH_USER, process.env.BASIC_AUTH_PASSWORD)
  )
}

app.use(bodyParser.json())
app.use(cookieParser())
app.use(session())
app.use(helmet())
app.use(helmet.noCache())
app.use(routes)

module.exports = app
