const { addExpense, getExpenses, deleteExpense, modifyExpense } = require('../controller/expenses')
const { addIncome, getIncomes, deleteIncome, modifyIncome } = require('../controller/income')

const router=require('express').Router()

// router.get('/',(req,res)=>{
//     res.send("Hello World from routes!")
// })

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)
      .put('/modify-income/:id', modifyIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpenses)
      .delete('/delete-expense/:id', deleteExpense)
      .put('/modify-expense/:id', modifyExpense)
      


module.exports=router