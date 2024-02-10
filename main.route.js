const express = require("express");
const router = express.Router({ mergeParams: true });

//Importing routes
const v1Router = require("./v1/routes/index.route");

//Routes
router.use("/v1",v1Router)

module.exports = router;

