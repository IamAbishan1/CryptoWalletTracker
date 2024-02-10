const { errorCatch } = require('../../utils/error')
const Wallet = require('../../models/wallet.model')
const BalanceHistory = require('../../models/balanceHistory.model');
const { calculatePercentChange, getPercentChange } = require('./helper/helper');

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getWalletBalanceController = async(req,res)=>{
    try{
        let { wAddress , date } = req.query;

        let filterQuery = {};
        if(wAddress){
            filterQuery.address = wAddress
        }
        date = date ? new Date(date) : new Date(); 

        const wallets = await Wallet.find({},'address balance').lean();
        const balanceHistory = await BalanceHistory.find(filterQuery,'-_id -__v').lean();

        if(!wallets){
            return errorCatch(404,"No data!! Run seed.js")
        }

        if(!balanceHistory.length){
            const response = wallets.map(data=>{
                return {
                    address: data.address,
                    latestBalance : data.balance,
                    dailyChange : 0,
                    weeklyChange : 0
                }
            })

            return res.json({wallets: response})
        }
        const walletData = calculatePercentChange(date, balanceHistory)
        const response = walletData.map(data=>{
            const balance = {};
            const wallet = wallets.filter(wallet=>wallet.address == data.address);
            
            balance.latestBalance = wallet[0].balance
            balance.dailyChange = getPercentChange(parseFloat(data.balanceChanges.todayData), parseFloat(data.balanceChanges.prevData)).toFixed(2);
            balance.weeklyChange = getPercentChange(parseFloat(data.balanceChanges.thisWeekData), parseFloat(data.balanceChanges.prevWeekData)).toFixed(2);

            return balance;
        })

        res.json({"wallet":response})
    }catch(err){
        console.error(err);
        errorCatch(req,res);
    }

}