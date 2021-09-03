const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const defaultPORT = 3000;
 
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

const PORT = process.env.PORT || defaultPORT;
 
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
