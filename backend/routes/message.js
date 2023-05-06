const express = require('express');
const router = require("express").Router();
const app = express()
const messageRoutes = express.Router();
const cors = require('cors');

const Message = require('../models/message');

router.use(cors());

// Get all messages
messageRoutes.get('/', (req, res) => {
  Message.find((err, messages) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(messages);
    }
  });
});
// Get single employee
messageRoutes.get('/read/:id',(req, res) => {
  Message.findById(req.params.id, (err, messages) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json(messages);
    }
  });
});

//fonction count
messageRoutes.get('/getM',(req,res) => {
  Message.count({}).exec(function(err, st) {
      if (st == 0 && err) {
        res.json("Pas de messages", err);
      } else {
        res.json(st); 
      }
    });
});

// Add new message
messageRoutes.post('/new', (req, res) => {
    const message = new Message({
      nom: req.body.nom,
      email: req.body.email,
      subject: req.body.subject,
      mess: req.body.mess,
      
    });
    message.save()
    .then(() => {
        res.status(200).json({ message: 'Message submitted successfully!' });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});
// Update employee
messageRoutes.put('/update/:id',(req, res) => {
  Message.findByIdAndUpdate(
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
// Delete a message by id
messageRoutes.delete('/delete/:id', (req, res) => {
  Message.findByIdAndDelete(req.params.id, (err, message) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!message) {
      res.status(404).json({ error: 'Message not found' });
    } else {
      res.status(200).json({ message: 'Message deleted successfully' });
    }
  });
});


    module.exports = messageRoutes;