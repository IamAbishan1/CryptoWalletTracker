const axios = require("axios");
const mongoose = require('mongoose')
require('dotenv')
const BalanceHistory = require("../src/models/balanceHistory.model");
const Wallet = require("../src/models/wallet.model");
const { connectDb } = require("../config/db")

const fetchWalletBalance = async (wAddress) => {
  const endPoint = `https://api.bscscan.com/api?module=account&action=balance&address=${wAddress}&tag=latest&apikey=${process.env.BSCSCAN_API_KEY}`;

  const response = await axios.get(endPoint);
  // Convert the balance from wei to BNB
  const balance = (response.data.result) / 1e18 || 0; 

  return balance;
};

exports.updateWalletBalance = async(wAddress)=>{
    // Connect to MongoDB
    // await mongoose
    //   .connect(process.env.MONGO_URL, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    //   })
    //   .then(() => {
    //     console.log(` connected successfully!`);
    //   })
    //   .catch((error) => {
    //     console.log(`MongoDB connection failed! Error: ${error}`);
    //   });
    
    const [walletData , bHistory]= await Promise.all([Wallet.findOne({address:wAddress}),BalanceHistory.findOne({address:wAddress})])
    
    const historyData = { 
        balance : walletData.balance,
        date : new Date().toISOString()
    }
    if(bHistory){
        bHistory.balanceHistory.push(historyData)
        bHistory.save();
    }else{
        const BalanceHistoryObj = new BalanceHistory({
            address: wAddress,
            balanceHistory: [historyData]
        })
        BalanceHistoryObj.save();
    }
    walletData.balance = await fetchWalletBalance(wAddress)
    await walletData.save()
}

