const express = require('express');
const router = express.Router({ mergeParams: true });

//Import routers
const walletRouter = require('./wallet.route');

//Implement routes
router.use('/wallet',walletRouter);

module.exports = router;
