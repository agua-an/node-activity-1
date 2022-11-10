import express from 'express';

import usersRouter from './routes/users'
import postsRouter from './routes/posts'

// Initialize express server
const app =  express();
const port = 8000

/*
 * Middleware that enables express
 * to understand JSON file format
 */
app.use(express.json())


app.use('/users/', usersRouter)
app.use('/posts/', postsRouter)

/*
 * Start the express server
 */
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
})


