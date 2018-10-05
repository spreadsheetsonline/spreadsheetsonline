const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const knex = require('./db/knex')
const PORT = process.env.PORT || 8000;

app.use(morgan("dev"))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Sup Mah Dude");
});

app.listen(PORT, () => {
    console.log(`Server is accepting connections on port => ${PORT}`);
});