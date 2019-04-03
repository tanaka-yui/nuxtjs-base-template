import { Response, Router, NextFunction } from 'express'

import { Request } from '../../../types/express'
import * as services from '../services/auth'
import { AuthApiUrl } from './url'

const router = Router()

router.post(
  AuthApiUrl.LOGIN,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await services.login(req, res)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  AuthApiUrl.STATUS,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await services.loginStatus(req, res)
    } catch (e) {
      next(e)
    }
  }
)

router.get(
  AuthApiUrl.LOGOUT,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await services.logout(req, res)
    } catch (e) {
      next(e)
    }
  }
)

export default router
