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
        res.status(200).json({message: 'Expense Added'})
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
        .then((Expense)=>{
            res.status(200).json({message: "Expense Deleted"})
        })
        .catch((error =>{
            res.status(500).json({error: error.message});
        }))
}

// TODO : Modify income - add code