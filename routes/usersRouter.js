// Express
const express = require('express');
// Services
const UserService = require('./../services/userServices');
// Middelewares
const validatorHandler = require('./../middlewares/validatorHandler');
// Schema
const { createUserSchema, updateUserSchema, getUserSchema } = require('./../schemas/userSchema');

const router = express.Router();
const services = new UserService();

// GET
router.get('/', async (req, res) => {
  const users = await services.find();
  res.json(users);
});

router.get('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await services.findOne(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
});

router.post('/', validatorHandler(createUserSchema, 'body'), async (req, res) => {
  const body = req.body;
  const newUser = await services.create(body);

  res.status(201).json({
    message: 'created',
    data: newUser
  });
});

router.patch('/:id', validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const user = await services.update(id, body);

    res.json({
      message: 'update',
      data: user
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { id } = req.params;
    const del = await services.delete(id)

    res.json({
      message: 'deleted',
      del
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router
