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
// Delete an message
router.delete('delete/:id', Message, async (req, res) => {
  try {
    await res.message.remove();
    res.json({ message: 'message deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

    module.exports = messageRoutes;