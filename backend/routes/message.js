const express = require('express');
const router = require("express").Router();
const app = express()
const messageRoutes = express.Router();
const cors = require('cors');

const Message = require('../models/message');

router.use(cors());



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

    module.exports = messageRoutes;