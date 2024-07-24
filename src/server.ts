import { app } from './app'
import { env } from './env'

app
  .listen({
    port: env.SERVER_PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🚀 HTTP server running...')
  })
