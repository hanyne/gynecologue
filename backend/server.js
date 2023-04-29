const express = require('express')
const path = require('path')
const multer = require('multer');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const createError = require('http-errors')

// Connecting with mongo db
mongoose
  .connect('mongodb+srv://hanyne:1234@cluster0.uclfv9f.mongodb.net/test')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err.reason)
  })
 

// Setting up port with express js
const employeeRoute = require('../backend/routes/employee.route')
const carnetRoute = require('../backend/routes/carnet.route')
const appointmentRoutes = require('../backend/routes/appointment');
const messageRoutes = require('../backend/routes/message');
const articleRoutes = require('../backend/routes/article');
const auth = require("../backend/routes/auth.routes")
const patiente = require("../backend/routes/patiente.routes")
const secretaire = require("../backend/routes/secretaire.routes")
const medic = require("../backend/routes/medic.routes")
const ord = require("../backend/routes/ordonance")

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/', express.static(path.join(__dirname, 'dist/mean-stack-crud-app')));
app.use('/api', employeeRoute);
app.use('/carnet', carnetRoute);
app.use('/appointment', appointmentRoutes);
app.use('/message', messageRoutes);
// routes middleware
app.use('/articles', articleRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// routes
app.use('/auth', auth);
app.use('/patiente', patiente);
app.use('/secretaire', secretaire);
app.use('/uploads', express.static('uploads'));
app.use('/medic', medic);
app.use('/ord', ord);

// Create port
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`Connected to port ${port}`);
});

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message) // Log error message in our server's console
  if (!err.statusCode) err.statusCode = 500 // If err has no specified error code, set error code to 'Internal Server Error (500)'
  res.status(err.statusCode).send(err.message) // All HTTP requests must have a response, so let's send back an error with its status code and message
})

//pour les images BFR(Backend et Frontend Relation)
const corsOptions = {
  origin: 'http://localhost:4200', // Replace with your Angular app's domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions)); 


// Allow cross-origin requests from the Angular app
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
