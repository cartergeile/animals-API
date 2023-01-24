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
  //const app = express()
// update app object
const app = require('liquid-express-views')(express())

  // middleware
  middleware(app)

  /* --------- ROUTES -------- */
  // HOME ROUTE
  app.get('/', (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('home.liquid', { username, loggedIn, userId })
  })

  app.use('/animals', AnimalRouter)
  app.use('/comments', CommentRouter)
  app.use('/users', UserRouter)
  
  // renders error page
  app.get('/error', (req, res) => {
    const error = req.query.error || 'This page does not exist.'
    const { username, loggedIn, userId } = req.session
    res.render('error.liquid', { error, username, loggedIn, userId })
  })

// Catch all 
app.all('*', (req, res) => {
  res.redirect('/error')
})


  // Server Listener
  const PORT = process.env.PORT
  app.listen(PORT, () => console.log(`Now listening to the sweet sounds of port: ${PORT}`))