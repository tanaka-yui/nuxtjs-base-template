import { Response } from 'express'

import { Request } from '../../../types/express'
import { AuthUser, SessionState } from '../../../types/api/auth'

export interface LoginBody {
  id: string
  password: string
}

export const login = async (
  req: Request<any, any, LoginBody, SessionState>,
  res: Response
) => {
  try {
    // TODO 認証APIをここで実装する
    const user: AuthUser = await new Promise((resolve, reject) => {
      if (
        req.body.id === process.env.BASIC_AUTH_USER &&
        req.body.password === process.env.BASIC_AUTH_PASSWORD
      ) {
        return resolve({
          id: 1,
          username: 'テストユーザー'
        })
      }
      return reject(new Error('fail'))
    })
    if (user && req.session) {
      req.session.authUser = {
        id: user.id,
        username: user.username
      }
      return res.sendStatus(200)
    }
  } catch (e) {}
  res.sendStatus(401)
}

export const loginStatus = (
  req: Request<any, any, any, SessionState>,
  res: Response
) => {
  if (req.session && req.session.authUser) {
    res.sendStatus(200)
    return
  }
  res.sendStatus(401)
}

export const logout = (
  req: Request<any, any, any, SessionState>,
  res: Response
) => {
  if (req.session) {
    delete req.session.authUser
  }
  res.redirect('/')
}
