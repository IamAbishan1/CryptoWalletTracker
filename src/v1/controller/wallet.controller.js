const { errorCatch } = require('../../utils/error')
const { calculatePercentChange, getPercentChange } = require('./helper/helper');
const { getAllBalanceHistory } = require("../../services/balanceHistory.services");
const { getAllWallets } = require('../../services/wallet.services');

/**
 * Controller function to get wallet balance information.
 * @async
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Promise<void>} - Promise representing the operation completion.
 * @throws {Error} - If an error occurs during the operation.
 */
exports.getWalletBalanceController = async(req,res)=>{
    try{
        let { wAddress , date, page = 1, length = 25 } = req.query;
        console.log("hhere",page)

        let filterQuery = {};
        if(wAddress){
            filterQuery.address = wAddress
        }
        date = date ? new Date(date) : new Date(); 

        const wallets = await getAllWallets(page, length);
        const balanceHistory = await getAllBalanceHistory(filterQuery,page,length);

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
            
            balance.address = wallet[0].address
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