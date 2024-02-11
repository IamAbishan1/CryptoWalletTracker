const axios = require("axios");
const mongoose = require('mongoose')
require('dotenv')
const BalanceHistory = require("../src/models/balanceHistory.model");
const Wallet = require("../src/models/wallet.model");
const { connectDb } = require("../config/db")

/**
 * Fetches the balance of a wallet from the Binance Smart Chain (BSC) using the BscScan API.
 * @async
 * @param {string} wAddress The address of the wallet for which to fetch the balance.
 * @returns {Promise<number>} A Promise that resolves with the balance of the wallet in BNB (Binance Coin).
 */
const fetchWalletBalance = async (wAddress) => {
  const endPoint = `https://api.bscscan.com/api?module=account&action=balance&address=${wAddress}&tag=latest&apikey=${process.env.BSCSCAN_API_KEY}`;

  const response = await axios.get(endPoint);
  // Convert the balance from wei to BNB
  const balance = (response.data.result) / 1e18 || 0; 

  return balance;
};

/**
 * Updates the balance of a wallet and its corresponding balance history.
 * @async
 * @param {string} wAddress The address of the wallet to update.
 * @returns {Promise<void>} A Promise that resolves once the update is complete.
 */
exports.updateWalletBalance = async(wAddress)=>{
    // Fetch wallet data and balance history
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
