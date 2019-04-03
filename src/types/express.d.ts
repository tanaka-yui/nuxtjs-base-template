import { Request as ExpressRequest } from 'express'
import { Session } from 'express-session'

interface Request<Q = any, P = qny, B = any, S extends Session | S = any>
  extends ExpressRequest {
  query: Q
  params: P
  body: B
  session?: S
  sessionID?: string
}
