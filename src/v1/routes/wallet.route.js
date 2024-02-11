const express = require("express");
const { query } = require('express-validator');
const router = express.Router({mergeParams: true});
const { validator } = require("../helper/validator");
const moment = require("moment");

//Validation here
const checkDate = () =>{
    return [
        query('date',"Invalid date for filter.")
            .custom( (value) => {
                if(moment(new Date(value)) > moment(new Date())){
                    console.log("here",moment(new Date()))
                    return Promise.reject("Invalid date selected.")
                }
                return Promise.resolve();
            })
    ]
}

//Import controllers
const { getWalletBalanceController } = require('../controller/wallet.controller')

router.get(
    '/',
    checkDate(),
    validator,
    getWalletBalanceController
    )

    module.exports = router;