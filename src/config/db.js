const mongoose = require('mongoose')
const mongoUrl = process.env.MONGO_URL
const Wallet = require("../models/wallet.model");
const BalanceHistory = require("../models/balanceHistory.model");
const {
  walletData
} = require("../scripts/seedWallet")

const connectDb = mongoose.connect(mongoUrl,
    // 	{
    // 	useNewUrlParser : true,
    // 	useUnifiedTopology: true,
    //   }
  )
  .then(async () => {
    console.log('Database Connected');

    const wallets = await Wallet.find({}, '_id').lean();
    if (!wallets.length) {
      // Clear existing data
      await Promise.all([BalanceHistory.deleteMany(), Wallet.deleteMany()]);

      //Automatically seeding wallet and balance while setting up the project
      await Wallet.insertMany(walletData);
      console.log("Wallet populated successfully!");
    }
  })
  .catch((err) => {
    console.log(err);
    console.log("Error connecting database!!!.");
  });

module.exports = connectDb;