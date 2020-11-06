const express = require('express');
const cors = require('cors');

require('dotenv').config();
const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
const PORT = process.env.PORT;

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

const UPSIDEDOWM_MODE = process.env.UPSIDEDOWM_MODE;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    UPSIDEDOWM_MODE,
  );

  res.status(200).json(characters);
});

app.listen(3002, () => {
    console.log(`Escutando na porta ${PORT}`);
});
