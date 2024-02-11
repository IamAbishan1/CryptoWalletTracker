const moment = require('moment');

/**
 * Calculates the percentage change in balance data for each wallet based on the specified day.
 * @param {string} day The date for which to calculate the percentage change (in YYYY-MM-DD format).
 * @param {Array<Object>} bHistory An array of objects representing the balance history for each wallet.
 * @returns {Array<Object>} An array of objects containing the address and balance changes for each wallet.
 */
exports.calculatePercentChange = (day, bHistory) =>{

    /**
     * Represents the initial change object with keys for different time periods.
     * @typedef {Object} InitialChange
     * @property {number} todayData The total balance for the current day.
     * @property {number} prevData The total balance for the previous day.
     * @property {number} thisWeekData The total balance for the current week.
     * @property {number} prevWeekData The total balance for the previous week.
     */
    const dailyChange = bHistory.map(data=>{
        const initailChange = {
            todayData : 0,
            prevData : 0,
            thisWeekData : 0,
            prevWeekData : 0
        }

        const balanceChanges = data.balanceHistory.reduce((accum,curr)=>{

            const daysDiff = moment(day).diff(moment(curr.date),'days');
            if(daysDiff === 0 ){
                accum.todayData += parseFloat(curr.balance)
            }

            if(daysDiff === 1 ){
                accum.prevData += parseFloat(curr.balance)
            }

            if(daysDiff < 7 ){
                accum.thisWeekData += parseFloat(curr.balance)
            }

            if(daysDiff > 7 && daysDiff <= 14){
                accum.prevWeekData += parseFloat(curr.balance)
            }
            return accum;
        },initailChange)
        
        const finalData = {
            address : data.address,
            balanceChanges
        }
        return finalData;
    })

    return dailyChange
}

/**
 * Calculates the percentage change between two values.
 * @param {number} finalValue The final value.
 * @param {number} initialValue The initial value.
 * @returns {number} The percentage change between the final and initial values.
 */
exports.getPercentChange = (finalValue, initalValue) =>{
    return ((finalValue - initalValue) / finalValue) * 100;
}