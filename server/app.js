const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');

// Passport config
// require('./config/passport')(passport);

app.use(cookieParser());

// CORS config
// app.use(
//   cors({
//     credentials: true,
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'PUT', 'POST', 'DELETE'],
//   })
// );
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

// Json config
app.use(express.json());

// dotenv config
require('dotenv').config();

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

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Routes imports
const productRoutes = require('./routes/product');
const userRoutes = require('./routes/user');
const cartRoutes = require('./routes/cart');

// Routes
app.use('/', productRoutes);
app.use('/', userRoutes);
app.use('/', cartRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`);
});
