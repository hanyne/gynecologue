const express = require('express')
const router = require("express").Router();
const app = express()
const carnetRoute = express.Router()
const multer = require("../config/multer");

// Carnet model
 const Carnet  = require('../models/Carnet')


// Add Carnet
carnetRoute.route('/:patientId/create').post((req, res, next) => {
    Carnet.create(
    {...req.body, 
    patientId: req.params.patientId,
  },
      (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Carnets
carnetRoute.route('/').get((req, res) => {
  const { nom } = req.query;
  const query = nom ? { nom: { $regex: new RegExp(nom), $options: 'i' } } : {};
  Carnet.find(query, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Get single Carnet
carnetRoute.route('/read/:patientId/:id').get((req, res) => {
  Carnet.findOne({
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
carnetRoute.route('/update/:id').put((req, res, next) => {
    Carnet.findByIdAndUpdate(
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
carnetRoute.route('/delete/:id').delete((req, res) => {
  Carnet.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      res.status(200).json({ message: 'Message deleted successfully' });
    }
  });
});

module.exports = carnetRoute
