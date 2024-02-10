const moment = require('moment');

exports.calculatePercentChange = (day, bHistory) =>{
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

exports.getPercentChange = (finalValue, initalValue) =>{
    return ((finalValue - initalValue) / finalValue) * 100;
}