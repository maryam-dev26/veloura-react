import { app } from './src/app.js';
import { connectDB } from './src/config/db.js';
import { env } from './src/config/env.js';

const port = env.PORT || 3000
const startServer = async () => {
  await connectDB()
  app.listen(port, () => {
    console.log(`server is running on ${port}`)
  })
}

try {
  await startServer()
} catch (error) {
  console.error('failed to start server', error)
}
