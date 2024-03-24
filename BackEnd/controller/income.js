const IncomeSchema = require("../modules/incomeModule")

exports.addIncome=async (req,res)=>{
    // console.log(req.body)
    const {title,amount,catagory,description,date}= req.body
    const income =IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        console.error(error); // Log the error to console for debugging
        res.status(500).json({error: error.message}); // Return the error message in the response
    }

    console.log(income)
}

exports.getIncomes=async(req,res)=>{
    try {
        const incomes =await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
        
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
        
    }
}


exports.deleteIncome=async(req,res)=>{
    const {id}= req.params;
    console.log(req.params)
    IncomeSchema.findByIdAndDelete(id)
        .then((income)=>{
            res.status(200).json({message: "Income Deleted"})
        })
        .catch((error =>{
            res.status(500).json({error: error.message});
        }))
}

// TODO : Modify income - add code