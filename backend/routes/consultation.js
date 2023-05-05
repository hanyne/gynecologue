const express = require('express')
const router = require("express").Router();
const consultationRoute = express.Router()


// consultation model
 const Consultation  = require('../models/consultation')


// Add consultation
consultationRoute.route('/:patientId/create').post((req, res, next) => {
    Consultation.create(
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

// Get All consultations
consultationRoute.route('/patient/:patientId').get((req, res,  next) => {
  Consultation.find(
    { patientId: req.params.patientId },
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.json(data);
      }
    }
  );
});

// Get single consultation
consultationRoute.route('/read/:id').get((req, res) => {
    Consultation.findOne({
    _id: req.params.id,
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// Update consultation
consultationRoute.route('/update/:id').put((req, res, next) => {
    Consultation.findByIdAndUpdate(
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
        console.log('consultation updated successfully')
      }
    },
  )
})
// Delete a consultation by id
consultationRoute.route('/delete/:id').delete((req, res) => {
  Consultation.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'consultation not found' });
    } else {
      res.status(200).json({ message: 'consultation deleted successfully' });
    }
  });
});

module.exports = consultationRoute
