import { Request, Response, NextFunction } from 'express'

import { Request as CustomRequest } from '../../types/express'
import { SessionState } from '../../types/api/auth'

/**
 * ExpressのAPIの認証チェック
 */
export default function(
  req: CustomRequest<any, any, any, SessionState> | Request,
  res: Response,
  next: NextFunction
): void {
  if (!req.session || !req.session.authUser) {
    res.sendStatus(401)
    return
  }
  next()
}
