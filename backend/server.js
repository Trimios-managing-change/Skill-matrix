const express = require('express');
const app = express();
const port = 3001;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const Authruotes = require('./routes/authRoutes');

app.use(cors());
app.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Could not connect to MongoDB', err);

  });

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/register',Authruotes);
app.post('/login',Authruotes);

app.listen(port, () => {
  console.log(`http://127.0.0.1:${port}`);
});
