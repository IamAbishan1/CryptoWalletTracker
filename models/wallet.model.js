const mongoose = require("mongoose");

const walletModel = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    balance: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wallet", walletModel);
