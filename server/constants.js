const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/server';

module.exports = {
  MONGO_URL,
  PORT,
}