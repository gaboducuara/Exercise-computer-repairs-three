const express = require('express');

// Middlewares
const { repairExists } = require('../middlewares/middlewares.repairs');
const {
  protectToken,
  protectEmployee,
} = require('../middlewares/middlewares.users');

const {
  createRepairValidations,
  checkValidations,
} = require('../middlewares/middlewares.validations');

//Controller
const {
  getAllRepairs,
  getAllCompletedRepairs,
  getAllPendingRepairs,
  createRepair,
  getRepairById,
  updateRepair,
  deleteRepair,
} = require('../controllers/repairs.controller');

const router = express.Router();

router.post('/', createRepairValidations, checkValidations, createRepair);

router.use(protectToken);
router.get('/', protectEmployee, getAllRepairs);
router.get('/completed', protectEmployee, getAllCompletedRepairs);
router.get('/pending', protectEmployee, getAllPendingRepairs);

router
  .use('/:id', repairExists)
  .route('/:id')
  .get(repairExists, protectEmployee, getRepairById)
  .patch(repairExists, protectEmployee, updateRepair)
  .delete(repairExists, protectEmployee, deleteRepair);

module.exports = { repairsRouter: router };