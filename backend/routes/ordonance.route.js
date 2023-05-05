const express = require('express')
const router = require("express").Router();
const app = express()
const ordonanceRoute = express.Router()


// Carnet model
 const Ordonance  = require('../models/ordonnace')


// Add Carnet
ordonanceRoute.route('/:patientId/create').post((req, res, next) => {
    Ordonance.create(
    {...req.body, 
    patientId: req.params.patientId,
  },
      (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)    }
  })
})


// Get All ordonance
ordonanceRoute.route('/').get((req, res) => {
  const { date } = req.query;
  const query = date ? { date: { $regex: new RegExp(date), $options: 'i' } } : {};
  Ordonance.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single Carnet
ordonanceRoute.route('/read/:patientId/:id').get((req, res) => {
  Ordonance.findOne({
    _id: req.params.id,
    patientId: req.params.patientId,
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update Carnet
ordonanceRoute.route('/update/:id').put((req, res, next) => {
    Ordonance.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})
// Delete a carnet by id
ordonanceRoute.route('/delete/:id').delete((req, res) => {
  Ordonance.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      res.status(200).json({ message: 'Message deleted successfully' });
    }
  });
});

module.exports = ordonanceRoute
