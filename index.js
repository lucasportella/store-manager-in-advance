const express = require('express');
const bodyParser = require('body-parser');

const productsController = require('./controllers/productsController');
const middlewares = require('./middlewares/middlewares');
const { errorMiddleware } = require('./middlewares/errorMiddleware');

const app = express();
const defaultPORT = 3000;

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products',
  middlewares.checkCreateProductInput,
  middlewares.checkRepeatedName,
  productsController.createProduct);

app.use(errorMiddleware);

const PORT = process.env.PORT || defaultPORT;
 
app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
