const express = require('express'); //  comment
const cors = require('cors');

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

// const hereIsTheUpsideDown = true;
const hereIsTheUpsideDown = process.env.UPSIDEDOWM_MODE === 'true';
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    hereIsTheUpsideDown,
  );

  res.status(200).json(characters);
});

app.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}`);
});


// const express = require('express');

// const app = express();

// // 39502
// const PORT = process.env.PORT || 3000;
// // const SERVER_ENV = process.env.SERVER_ENV || 'deu ruim :/';

// app.get('/', (_, res) => {
//   res.send(`Você está navegando no ambiente de test`);

//   // res.send(`Você está navegando no ambiente de ${SERVER_ENV}`);
// });

// app.listen(PORT, () => { console.log(`Escutando na porta ${PORT}`); }); 
