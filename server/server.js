const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { PORT, MONGO_URL } = require('./constants');
const inventoryPath = require('./routes/inventory');

const app = express();

// setup middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use('/inventory', inventoryPath);


// setup basic routes
app.get('/', (req, res) => {
  res.send('Hello World');
});

// connect to database
mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', () => {
  console.log('Connected to DB');
})

// start listening
app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
