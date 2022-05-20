const express = require('express');
const { body } = require('express-validator');

// Middlewares
const {
  userExists,
  protectToken,
  protectEmployee,
  protectAccountOwner,
} = require('../middlewares/middlewares.users');
const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validations.middlewares');

//Controller
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
  checkToken,
} = require('../controllers/users.controller');

const router = express.Router();

router.post('/', createUserValidations, checkValidations, createUser);
router.post('/login', login);

router.use(protectToken);

router.get('/', protectEmployee, getAllUsers);

router.get('/check-token', checkToken);

router
  .route('/:id')
  .get(userExists, protectEmployee, getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };