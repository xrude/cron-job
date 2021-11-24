const cron = require('node-cron');
const express = require('express');
const userData = require('./userdata.json')
const moment = require('moment');

app = express();




function checkTimeDifference(dateTime1 , dateTime2){
  
    let  diff =(dateTime2.getTime() - dateTime1.getTime()) / 1000;
    diff /= 60;
    formatDiff =  Math.abs(Math.round(diff));
    if(formatDiff <= 230)
        return true
    
    return false
}

cron.schedule('*/1 * * * *', function() {
    console.log('running a task every 15 minute');
   
    totalUserCount = userData.data.length
    userCreatedUnder15Minutes = []
    
    for(var x = 0 ; x < totalUserCount; x++){
        userCreationTime = userData.data[x].time
        checkCreationTime = moment(userCreationTime).subtract(15, 'minutes').toDate()
    
        currentDateTime = new Date()
        userCreationTime = checkTimeDifference(checkCreationTime ,currentDateTime )
        if (userCreationTime === true){
            userCreatedUnder15Minutes.push(userData.data[x])
        }
    }
    console.log(userCreatedUnder15Minutes)
});


app.listen(3000);


