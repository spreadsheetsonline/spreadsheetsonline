import express from 'express';
import morgan from 'morgan';
import { json } from 'body-parser';
import auth from '../routes/auth';

const app = express();

const PORT = process.env.PORT || 8000;

app.use(morgan('dev'));
app.use(json());

app.use('/auth', auth);

app.get('/', (req, res) => {
  res.send('Sup Mah Dude');
});

app.listen(PORT, () => {
  console.log(`Server is accepting connections on port => ${PORT}`);
});
