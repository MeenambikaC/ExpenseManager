const { addExpense, getExpenses, deleteExpense, modifyExpense } = require('../controller/expenses')
const { addIncome, getIncomes, deleteIncome, modifyIncome } = require('../controller/income')
const {addReminder,getReminder,deleteReminder,modifyReminder,sendRemindersForToday}=require('../controller/reminder')
const{login, getLoginStatus}=require('../controller/login')
const router=require('express').Router()

router.get('/app',(req,res)=>{
    res.send("Hello World from routes!")
})

router.post('/add-income', addIncome)
      .get('/get-incomes', getIncomes)
      .delete('/delete-income/:id', deleteIncome)
      .put('/modify-income/:id', modifyIncome)
      .post('/add-expense', addExpense)
      .get('/get-expenses', getExpenses)
      .delete('/delete-expense/:id', deleteExpense)
      .put('/modify-expense/:id', modifyExpense)
      .post('/add-reminder', addReminder)
      .get('/get-reminders', getReminder)
      .delete('/delete-reminder/:id', deleteReminder)
      .put('/modify-reminder/:id', modifyReminder)
      .post('/login',login)
      .get('/get-loginstatus', getLoginStatus)
    //   .get('/send-reminders-for-today', sendRemindersForToday);
      


module.exports=router