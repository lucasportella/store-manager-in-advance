const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares/middlewares');

const productsController = require('./controllers/productsController');

const app = express();
const defaultPORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products',middlewares.checkCreateProductInputMiddleware,
  productsController.createProduct);

const PORT = process.env.PORT || defaultPORT;
 
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
