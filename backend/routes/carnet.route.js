const express = require('express')
const router = require("express").Router();
const app = express()
const carnetRoute = express.Router()
const multer = require("../config/multer");

// Carnet model
 const Carnet  = require('../models/Carnet')


// Add Carnet
carnetRoute.route('/create').post((req, res, next) => {
    Carnet.create(req.body, (error, data) => {
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
carnetRoute.route('/read/:id').get((req, res) => {
    Carnet.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

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

// Delete Carnet
carnetRoute.route('/delete/:id').delete((req, res, next) => {
    Carnet.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = carnetRoute
