const sendRemindersForToday = require('../controller/reminder').sendRemindersForToday;

// export default async function handler(req, res) {
//     try {
//         // const now = new Date();
//         // const srilankanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
//         // const dateToCheck = srilankanTime.toISOString().split('T')[0];

//         await sendRemindersForToday();
//         res.status(200).json({ message: `Reminder emails sent successfully for: ${dateToCheck}` });
//     } catch (error) {
//         console.error('Error sending reminder emails:', error);
//         res.status(500).json({ error: 'Failed to send reminder emails' });
//     }
// }
const cron = require('node-cron');

cron.schedule(async () => {
    // cron.schedule('53 0,6 * * *', async () => {
        try {
            // Call the function directly
            await sendRemindersForToday({}, {}); // Pass empty request and response objects
            // console.log('Reminder emails sent successfully for today');
        } catch (error) {
            console.error('Error sending reminder emails1:', error);
        }
    });