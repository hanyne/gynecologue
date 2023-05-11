const Appointment = require('../models/appointment');

// Get all appointments
exports.AppointmentAll = (req, res) => {
  Appointment.find((err, appointments) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(appointments);
    }
  });
};

// Add new appointment
exports.saveAppointment =(req, res) => {
  const appointment = new Appointment({
    ...req.body,
  });

  appointment.save((err) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(appointment);
    }
  });
};
//fonction count
exports.countAppointment =(req,res) => {
  Appointment.count({}).exec(function(err, st) {
      if (st == 0 && err) {
        res.json("Pas de messages", err);
      } else {
        res.json(st); 
      }
    });
};

// Delete appointment
exports.deleteAppointment = (req, res) => {
  Appointment.findByIdAndRemove(req.body._id, (err, appointment) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(appointment);
    }
  });
};
