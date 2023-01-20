// import dependencies
const express = require('express')
const morgan = require('morgan')
require('dotenv').config()
const path = require('path')
const AnimalRouter = require('./controllers/animalControllers')
const UserRouter = require('./controllers/userControllers')
const CommentRouter = require('./controllers/commentControllers')
const middleware = require('./utils/middleware')



  // express app object
  const app = express()

  // middleware
  middleware(app)

  /* --------- ROUTES -------- */
  app.get('/', (req, res) => {
    res.send('Server is live, ready for requests')
  })

  app.use('/animals', AnimalRouter)
  app.use('/comments', CommentRouter)
  app.use('/users', UserRouter)
  




  // Server Listener
  const PORT = process.env.PORT
  app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))