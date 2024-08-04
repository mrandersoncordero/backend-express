const express = require('express');
const productsRouter = require('./productsRouter');
const categoriesRouter = require('./categoriesRouter');
const usersRouter = require('./usersRouter');

function routerApi(app) {
  const router = express.Router();

  // Definir la ruta raíz para la versión 1 de la API
  app.use('/api/v1', router);

  // Anidar las rutas de recursos bajo el router para /api/v1
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);

  // Si quisieras definir otra versión, podrías usar algo similar
  // const routerV2 = express.Router();
  // app.use('/api/v2', routerV2);
  // routerV2.use('/products', productsRouter2);
}

module.exports = routerApi;
