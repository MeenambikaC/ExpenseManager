const IncomeSchema = require("../modules/incomeModule")

exports.addIncome=async (req,res)=>{
    // console.log(req.body)
    const {title,amount,category,description,date}= req.body
    const income =IncomeSchema({
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
        await income.save()
        res.status(200).json({message: 'Income Added Successfully'})
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
        .then((income) => {
            if (!income) {
                return res.status(404).json({ message: "Income specified not found" });
            }
            res.status(200).json({ message: "Income Deleted Successfully" });
        })
        .catch((error =>{
            res.status(500).json({error: error.message});
        }))
}

// TODO : Modify income - add code
exports.modifyIncome = async (req, res) => {
    const { id } = req.params;
    const { fieldToUpdate, newValue } = req.body;
    console.log(req.params)
    console.log(req.body)
    try {
        const updatedIncome = await IncomeSchema.findByIdAndUpdate(id, { [fieldToUpdate]: newValue }, { new: true });

        if (!updatedIncome) {
            return res.status(404).json({ message: "Income specified not found" });
        }

        res.status(200).json({ message: "Income updated successfully", updatedIncome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


