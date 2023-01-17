import { Express, Router } from 'express'
import { Ctx } from './../types/context'
import userRouter from './user'

export default (ctx: Ctx, app: Express): Router => {
  const router = Router()

  // Map Routes
  router.use(
    '/user',
    userRouter(ctx, app)
    // #swagger.tags = ['user']
  )

  return router
}
