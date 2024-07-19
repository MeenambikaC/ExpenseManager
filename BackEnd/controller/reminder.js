const ReminderSchema = require("../modules/ReminderSchema")
// const sendReminderEmail = require('./sendEmail');
exports.addReminder=async (req,res)=>{
    // console.log(req.body)
    const {title,amount,category,description,date,email}= req.body
    const reminder =ReminderSchema({
        title,
        amount,
        category,
        description,
        date,
        email
    })
    try {
        //validations
        if(!title || !category || !description || !date || !email){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){ // Corrected the condition check for amount
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await reminder.save()
        res.status(200).json({message: 'Reminder Added Successfully'})
    } catch (error) {
        console.error(error); // Log the error to console for debugging
        res.status(500).json({error: error.message}); // Return the error message in the response
    }

    console.log(reminder)
}

exports.getReminder=async(req,res)=>{
    try {
        const reminder =await ReminderSchema.find().sort({createdAt: -1})
        res.status(200).json(reminder)
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        
    }
}


exports.deleteReminder=async(req,res)=>{
    const {id}= req.params;
    console.log(req.params)
    ReminderSchema.findByIdAndDelete(id)
        .then((reminder) => {
            if (!reminder) {
                return res.status(404).json({ message: "Income specified not found" });
            }
            res.status(200).json({ message: "Reminder Deleted Successfully" });
        })
        .catch((error =>{
            res.status(500).json({error: error.message});
        }))
}

// TODO : Modify income - add code
exports.modifyReminder = async (req, res) => {
    const { id } = req.params;
    const { fieldToUpdate, newValue } = req.body;
    console.log(req.params)
    console.log(req.body)
    try {
        const updatedReminder = await ReminderSchema.findByIdAndUpdate(id, { [fieldToUpdate]: newValue }, { new: true });

        if (!updatedReminder) {
            return res.status(404).json({ message: "Reminder specified not found" });
        }

        res.status(200).json({ message: "Reminder updated successfully", updatedReminder });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// const sendReminders = async () => {
//     try {
//         const today = new Date().toISOString().split('T')[0];
//         const reminders = await ReminderSchema.find({ date: today });
//         console.log(today,"today")
//         console.log("reminders",reminders)
//         reminders.forEach(reminder => {
//             sendReminderEmail(reminder.email, 'Reminder: ' + reminder.title, reminder.description);
//         });
//         console.log('Reminder emails sent successfully for today');
//     } catch (error) {
//         console.error('Error sending reminder emails:', error);
//         throw error; // Re-throw the error to be caught by the cron job
//     }
// };

// const sendReminders = async () => {
//     try {
//         // Set your specific date here in 'YYYY-MM-DD' format
//         const specificDate = '2024-07-19'; // Example date

//         // Format the specificDate to ISO date format
//         const dateToCheck = new Date(specificDate).toISOString().split('T')[0];
//         const reminders = await ReminderSchema.find({ date: dateToCheck });
//         console.log("reminders", reminders);
        
//         reminders.forEach(reminder => {
//             sendReminderEmail(reminder.email, 'Reminder: ' + reminder.title, reminder.description);
//         });
        
//         console.log('Reminder emails sent successfully for:', dateToCheck);
//     } catch (error) {
//         console.error('Error sending reminder emails:', error);
//         throw error; // Re-throw the error to be caught by the cron job
//     }
// };

// Express endpoint
// exports.sendRemindersForToday = async (req, res) => {
//     try {
//         await sendReminders();
//         // res.status(200).json({ message: 'Reminder emails sent successfully' });
//     } catch (error) {
//         console.log("error",error)
//         // res.status(500).json({ error: error.message });
//     }
// };
