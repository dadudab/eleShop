const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Json config
app.use(express.json());

// dotenv config
require('dotenv').config();

// CORS config
app.use(cors());

// Database config
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

// Routes imports
const productRoutes = require('./routes/product');

// Routes
app.use('/', productRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
