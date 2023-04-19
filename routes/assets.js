const express = require('express');
const router = express.Router();
const AssetsController = require('../controllers/assetsController');
const passport = require('passport');

router.get('/', passport.authenticate("jwt", { session: false }), AssetsController.getAssets);

router.post('/', passport.authenticate("jwt", { session: false }), AssetsController.createAssets);

router.delete('/:id', passport.authenticate("jwt", { session: false }), AssetsController.deleteAssets);

router.put('/:id', passport.authenticate("jwt", { session: false }), AssetsController.updateAssets);

module.exports = router;