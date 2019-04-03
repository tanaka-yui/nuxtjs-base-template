import session from 'express-session'
import connect from 'connect-redis'

export default function() {
  const sessionOptions: session.SessionOptions = {
    secret: String(process.env.SESSION_SECRET),
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: process.env.SESSION_COOKIE_SECURE === 'true',
      maxAge: 1000 * 60 * Number(process.env.SESSION_COOKIE_MAX_AGE)
    }
  }

  if (process.env.REDIS_STORE_ENABLE === 'true') {
    const RedisStore = connect(session)
    const redisHost = process.env.REDIS_HOST
    const redisPort = Number(process.env.REDIS_PORT)
    sessionOptions.store = new RedisStore({
      host: redisHost,
      port: redisPort,
      prefix: process.env.REDIS_STORE_PREFIX
    })
  }
  return session(sessionOptions)
}
