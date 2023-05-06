const express = require('express');
const router = require("express").Router();
const app = express()
const appointmentRoutes = express.Router();
const cors = require('cors');

const Appointment = require('../models/appointment');

router.use(cors());

// Get all appointments
appointmentRoutes.get('/', (req, res) => {
  Appointment.find((err, appointments) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(appointments);
    }
  });
});

// Add new appointment
appointmentRoutes.post('/new', (req, res) => {
  const appointment = new Appointment({
    nom: req.body.nom,
    email: req.body.email,
    numt: req.body.numt,
    date: req.body.date,
    motif: req.body.motif,
  });

  appointment.save((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(appointment);
    }
  });
});
//fonction count
appointmentRoutes.get('/getA',(req,res) => {
  Appointment.count({}).exec(function(err, st) {
      if (st == 0 && err) {
        res.json("Pas de messages", err);
      } else {
        res.json(st); 
      }
    });
});

// Delete appointment
appointmentRoutes.post('/destroy', (req, res) => {
  Appointment.findByIdAndRemove(req.body._id, (err, appointment) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(appointment);
    }
  });
});

module.exports = appointmentRoutes;
