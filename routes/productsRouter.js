// Express
const express = require('express');
// Services
const ProductService = require('./../services/productServices');
// Middlewares
const validatorHandler = require('./../middlewares/validatorHandler');
// Schema
const { createProductSchema, updateProductSchema, getProductSchema } = require('./../schemas/productSchema');

const router = express.Router();
const service = new ProductService();

// GET
router.get('/', async (req, res) => {
  const products = await service.find();
  res.json(products);
})

router.get('/filter', async (req, res) => {
  res.send('Yo soy un filter');
})

router.get('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params; // params url
    const product = await service.findOne(id);

    res.json(product);
  } catch (error) {
    next(error);
  }
})

// POST
router.post('/', validatorHandler(createProductSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'created',
    data: newProduct
  });
})


// PATCH
router.patch('/:id', 
  validatorHandler(getProductSchema, 'params'), 
  validatorHandler(updateProductSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params
    const body = req.body;
    const product = await service.update(id, body);

    res.json({
      message: 'update',
      data: product
    });
  } catch (error) {
    next(error);
  }
});

// DELETE
router.delete('/:id', validatorHandler(getProductSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const del = await service.delete(id);
  
    res.json({
      message: 'deleted',
      del
    });
  }catch(error) {
    next(error);
  }
});

module.exports = router;
