const mongoose = require("mongoose");

const historyModel = mongoose.Schema({
    _id: false,
    balance: String,
    date: Date
})

const balanceHistoryModel = new mongoose.Schema(
  {
    address: {
      type: String,
    },
    balanceHistory: [historyModel],
  }
);

module.exports = mongoose.model("BalanceHistory", balanceHistoryModel);
