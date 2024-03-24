const { addIncome, getIncomes, deleteIncome } = require('../controller/income')

const router=require('express').Router()

// router.get('/',(req,res)=>{
//     res.send("Hello World from routes!")
// })

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)


module.exports=router