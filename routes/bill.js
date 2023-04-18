const express = require('express');
const router = express.Router();
const BillController = require('../controllers/billController');
const passport = require('passport');

router.get('/', passport.authenticate("jwt", { session: false }), BillController.getBillsByGroup);

router.get('/:period', passport.authenticate("jwt", { session: false }), BillController.getBills);

router.get('/all/current', passport.authenticate("jwt", { session: false }), BillController.getAllBills);

router.post('/', passport.authenticate("jwt", { session: false }), BillController.createBill);

//router.get('/:id', passport.authenticate("jwt", { session: false }), BillController.getBill);

router.put('/:id', passport.authenticate("jwt", { session: false }), BillController.updateBill);

router.delete('/:id', passport.authenticate("jwt", { session: false }), BillController.deleteBill);


module.exports = router;


