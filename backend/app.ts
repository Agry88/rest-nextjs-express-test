import type { Ctx } from './src/types/context'
import swaggerUi from 'swagger-ui-express'
import swaggerFile from './swagger_output.json'
import app from './src/init/express'
import prisma from './src/init/prisma'
import config from './src/configs'
import routes from './src/routes'

// Context Settings
const ctx: Ctx = {
  prisma,
  config
}

// Register routes
const router = routes(ctx, app)
app.use('/api', router)

// Swagger Setup
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

// Server Run Success info
app.listen(ctx.config.port, () => {
  console.info(`🚀 Server ready at: http://localhost:${ctx.config.port}`)
})
