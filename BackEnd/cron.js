const sendRemindersForToday = require('./controller/reminder').sendRemindersForToday;

export default async function handler(req, res) {
    try {
        // const now = new Date();
        // const srilankanTime = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Colombo" }));
        // const dateToCheck = srilankanTime.toISOString().split('T')[0];

        await sendRemindersForToday();
        res.status(200).json({ message: `Reminder emails sent successfully for: ${dateToCheck}` });
    } catch (error) {
        console.error('Error sending reminder emails:', error);
        res.status(500).json({ error: 'Failed to send reminder emails' });
    }
}