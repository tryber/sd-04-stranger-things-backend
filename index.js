const express = require('express');
require('dotenv').config();
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const { PORT, UPSIDEDOWN_MODE } = process.env;
const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

// const hereIsTheUpsideDown = true;
const hereIsTheUpsideDown = UPSIDEDOWN_MODE === 'true';

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

/* app.listen(3000, () => {
  console.log('Escutando na porta 3000');
}); */

app.listen(PORT || 3000, () => {
  console.log(`Escutando na porta 3000 ${PORT}`)