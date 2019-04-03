import { Router } from 'express'

import authRoutes from './routes/auth'

const router = Router()

router.use(authRoutes)

export default router
