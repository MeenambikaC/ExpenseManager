const ReminderSchema = require("../modules/ReminderSchema")

exports.addReminder=async (req,res)=>{
    // console.log(req.body)
    const {title,amount,category,description,date}= req.body
    const reminder =ReminderSchema({
        title,
        amount,
        category,
        description,
        date
    })
    try {
        //validations
        if(!title || !category || !description || !date){
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


