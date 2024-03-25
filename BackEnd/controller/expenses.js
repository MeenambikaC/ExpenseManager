const ExpenseSchema = require("../modules/expenseModule")

exports.addExpense=async (req,res)=>{
    // console.log(req.body)
    const {title,amount,catagory,description,date}= req.body
    const Expense =ExpenseSchema({
        title,
        amount,
        catagory,
        description,
        date
    })
    try {
        //validations
        if(!title || !catagory || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){ // Corrected the condition check for amount
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await Expense.save()
        res.status(200).json({message: 'Expense Added Successfully'})
    } catch (error) {
        console.error(error); // Log the error to console for debugging
        res.status(500).json({error: error.message}); // Return the error message in the response
    }

    console.log(Expense)
}

exports.getExpenses=async(req,res)=>{
    try {
        const Expenses =await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(Expenses)
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        
    }
}


exports.deleteExpense=async(req,res)=>{
    const {id}= req.params;
    console.log(req.params)
    ExpenseSchema.findByIdAndDelete(id)
    .then((expense) => {
        if (!expense) {
            return res.status(404).json({ message: "Expense specified not found" });
        }
        res.status(200).json({ message: "Expense Deleted Successfully" });
    })
        .catch((error =>{
            res.status(500).json({error: error.message});
        }))
}

// TODO : Modify Expense - add code
exports.modifyExpense = async (req, res) => {
    const { id } = req.params;
    const { fieldToUpdate, newValue } = req.body;
    console.log(req.params)
    console.log(req.body)
    try {
        const updatedExpense = await ExpenseSchema.findByIdAndUpdate(id, { [fieldToUpdate]: newValue }, { new: true });

        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense specified not found" });
        }

        res.status(200).json({ message: "Expense updated successfully", updatedExpense });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};