var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Client = require('./models/Client.model');
var Provider = require('./models/Provider.model');
var config = require('./config');

var cors = require('cors');

//swagger integration
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('./swagger.json');

// mongodb host
let env = process.env.NODE_ENV || 'development';
var db = config[env].db;
console.log(db);

// connect to mongodb
mongoose.connect(db, {
  useMongoClient: true
});

// setup express
var app = express();
var port = 8080;


// setup body parser for post requests
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// GET method route - homepage
app.get('/', (req, res) => {
  res.send('Home page!');
});

// GET method route - return all Clients
app.get('/clients', (req, res) => {

  Client.find({}).exec((err, response) => {
    if (err) {
      res.send('An error occured while getting all clients');
    } else {
      res.json(response);
    }
  });
});

// GET method route - return specified client
app.get('/client/:id', (req, res) => {

  Client.findOne({
    _id: req.params.id
  }).exec((err, response) => {

    if (err) {
      res.send('An error occured while getting the client');
    } else {
      res.json(response);
    }
  });
});

// POST method route - save a client
app.post('/client', (req, res) => {

  let newClient = new Client(req.body);

  newClient.save((err, response) => {

    if (err) {
      res.send('An error occured while saving client');
    } else {
      res.send(response);
    }
  });
});

// PUT method route - update a client field
app.put('/client/:id', (req, res) => {
  
  Client.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: { ...req.body } },
    { update: true },
    (err, response) => {
      if (err) {
        res.send('An error occured while updating client');
      } else {
        res.send(response);
      }
    }
  );
});

// DELETE method route - remove client
app.delete('/client/:id', (req, res) => {

  Client.findOneAndRemove(
    {
      _id: req.params.id
    },
    (err, response) => {
      if (err) {
        res.send('An error occured while removing the Client');
      } else {
        res.send(response);
      }
    }
  );
});

// GET method route - return all providers
app.get('/providers', (req, res) => {

  Provider.find({}).exec((err, response) => {
    if (err) {
      res.send('An error occured while getting all providers');
    } else {
      res.json(response);
    }
  });
});

// GET method route - return specified client
app.get('/provider/:id', (req, res) => {

  Provider.findOne({
    _id: req.params.id
  }).exec((err, response) => {
    if (err) {
      res.send('An error occured while getting the provider');
    } else {
      res.json(response);
    }
  });
});

// POST method route - save a client
app.post('/provider', (req, res) => {

  let newProvider = new Provider(req.body);

  newProvider.save((err, response) => {
    if (err) {
      res.send('An error occured while saving provider');
    } else {
      res.send(response);
    }
  });
});

// PUT method route - update a provider field
app.put('/provider/:id', (req, res) => {

  Provider.findOneAndUpdate(
    {
      _id: req.params.id
    },
    { $set: { ...req.body } },
    { update: true },
    (err, response) => {
      if (err) {
        res.send('An error occured while updating provider');
      } else {
        res.send(response);
      }
    }
  );
});

// DELETE method route - remove provider
app.delete('/provider/:id', (req, res) => {

  Provider.findOneAndRemove(
    {
      _id: req.params.id
    },
    (err, response) => {
      if (err) {
        res.send('An error occured while removing the provider');
      } else {
        res.send(response);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server running in port ${port}...`);
});
