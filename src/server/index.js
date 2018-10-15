import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { json } from 'body-parser';
import auth from '../routes/auth';
import knex from '../db/knex';

const app = express();

const PORT = process.env.PORT || 8000;
dotenv.config();
app.use(morgan('dev'));
app.use(json());

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Sup Mah Dude');
});

app.get('/test', (req, res) => {
  knex('items').then((data) => {
    res.json(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is accepting connections on port => ${PORT}`);
});
