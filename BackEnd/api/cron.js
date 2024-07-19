const sendRemindersForToday = require('../controller/reminder').sendRemindersForToday;
const cron = require('node-cron');

cron.schedule('*/3 * * * *', async () => {
    try {
        await sendRemindersForToday();
        console.log('Reminder emails sent successfully');
    } catch (error) {
        console.error('Error sending reminder emails:', error);
    }
});
