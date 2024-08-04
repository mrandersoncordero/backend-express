// Express
const express = require('express');
// Service
const categoryService = require('./../services/categoryServices');
// Middlewares
const validatorHandler = require('./../middlewares/validatorHandler');
// Schema
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/categorySchema');

const router = express.Router();
const services = new categoryService();

router.get('/', async (req, res) => {
  const categories = await services.find();
  res.json(categories);
})

router.get('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await services.findOne(id)
    res.json(category);
  } catch (error) {
    next(error);
  }
})

router.post('/', validatorHandler(createCategorySchema, 'body') ,async (req, res) => {
  const body = req.body;
  const newCategory = await services.create(body);

  res.status(201).json({
    message: 'created',
    data: newCategory
  });
});

router.patch('/:id', validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const category = await services.update(id, body);

    res.json({
      message: 'update',
      data: category
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validatorHandler(getCategorySchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const del = await services.delete(id)

    res.json({
      message: 'deleted',
      del
    });
  } catch (error) { 
    next(error);
  }
});

module.exports = router
