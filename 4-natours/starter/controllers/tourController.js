const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.checkID = (req, res, next, val) => {
  if (req.params.id * 1 > tours.length) return res.status(404).json({ status: 'fail', message: 'invalid id' })
  next()
}

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price)
    return res.status(400).json({ status: 'fail', message: 'missing name or price' })
  next()
}

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })

  next()
}

exports.getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(tour => tour.id === id)

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1
  const tour = Object.assign({ id: newId }, req.body)

  tours.push(tour)

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour,
      },
    })
  })
}

exports.updateTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(tour => tour.id === id)
  for (let prop in req.body) tour[prop] = req.body[prop]

  res.status(200).json({ status: 'success', data: { tour } })
}

exports.deleteTour = (req, res) => {
  res.status(204).json({ status: 'success', data: null })
}
