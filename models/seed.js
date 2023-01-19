// IMPORT DEPENDENCIES
const mongoose = require('../utils/connection')
const Animal = require('./animal')

// ADD SEED SCRIPT
/*-----------OLD SEED ROUTE----------*/

  // app.get('/animals/seed', (req, res) => {
  //   const startAnimals = [
  //     {name: 'Bear', color: 'Brown', age: '7'},
  //     {name: 'Lion', color: 'Orange', age: '11'},
  //     {name: 'Alligator', color: 'Green', age: '2'},
  //     {name: 'Elephant', color: 'Grey', age: '27'},
  //     {name: 'Zebra', color: 'Black', age: '13'},
  //   ]
  //   Animal.deleteMany({})
  //     .then(() => {
  //       Animal.create(startAnimals)
  //         .then(data => {
  //           res.json(data)
  //         })
  //         .catch(err => console.log('Error: \n', err))
  //     })
      
  // })

/*-----------NEW SEED SCRIPT---------*/
// save db connection to variable
const db = mongoose.connection

db.on('open', () => {
  const startAnimals = [
    {name: 'Bear', color: 'Brown', age: '7'},
    {name: 'Lion', color: 'Orange', age: '11'},
    {name: 'Alligator', color: 'Green', age: '2'},
    {name: 'Elephant', color: 'Grey', age: '27'},
    {name: 'Zebra', color: 'Black', age: '13'},
  ]

  Animal.deleteMany({ owner: null })
    .then(() => {
      Animal.create(startAnimals)
        .then(data => {
          console.log('here are the created animals: \n', data)
          db.close()
        })
        .catch(err => {
          console.log('Error: \n', err)
          db.close()
        })
    })
    .catch(err => {
      console.log(err)
      db.close()
    })
  })