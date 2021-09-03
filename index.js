const express = require('express');
const bodyParser = require('body-parser');

const { createProduct } = require('./models/productsModel');

const app = express();
const defaultPORT = 3000;
 
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', async (req, res) => {
  const { name, quantity } = req.body;
  const result = await createProduct(name, quantity);
  return res.status(200).json(result);
});

const PORT = process.env.PORT || defaultPORT;
 
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
