const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const auth = require('../routes/auth');

const app = express();

const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Sup Mah Dude');
});

app.listen(PORT, () => {
  console.log(`Server is accepting connections on port => ${PORT}`);
});
