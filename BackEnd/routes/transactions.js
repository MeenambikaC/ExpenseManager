const { addExpense, getExpenses, deleteExpense } = require('../controller/expenses')
const { addIncome, getIncomes, deleteIncome } = require('../controller/income')

const router=require('express').Router()

// router.get('/',(req,res)=>{
//     res.send("Hello World from routes!")
// })

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpenses)
      .delete('/delete-expense/:id', deleteExpense)


module.exports=router