const express = require('express')
const path = require('path')
const multer = require('multer');
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const createError = require('http-errors')
const cookieSession = require("cookie-session");
const db = require("./models");
const Role = db.role;

const app = express()

// Connecting with mongo db
db.mongoose
.connect(`mongodb+srv://hanyne:1234@cluster0.uclfv9f.mongodb.net/test`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Successfully connect to MongoDB.");
  initial();
})
.catch(err => {
  console.error("Connection error", err);
  process.exit();
});
var corsOptions = {
  origin: "http://localhost:4200",
  credentials: true
};
app.use(cors(corsOptions));
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "bezkoder-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: true
  })
);
app.use(
  cors({
    credentials: true,    
    origin: ["http://localhost:4200"],
  })
)
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// routes
require('././routes/auth.routes')(app);
require('././routes/user.routes')(app);


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



app.use(cors(corsOptions)); 


// Allow cross-origin requests from the Angular app
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
