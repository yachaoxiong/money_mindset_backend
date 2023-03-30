const express = require('express');
const router = express.Router();
const BudgetController = require('../controllers/budgetController');
const passport = require('passport');

router.get('/:period', passport.authenticate("jwt", { session: false }),BudgetController.getBudget);

router.post('/', passport.authenticate("jwt", { session: false }),BudgetController.createBudget);

router.get('/:id', passport.authenticate("jwt", { session: false }),BudgetController.getBudget);

router.put('/:id', passport.authenticate("jwt", { session: false }),BudgetController.updateBudget);

router.delete('/:id', passport.authenticate("jwt", { session: false }),BudgetController.deleteBudget);

module.exports = router;