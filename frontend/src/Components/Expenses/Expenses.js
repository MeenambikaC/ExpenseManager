import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';
import IncomeItems from '../IncomeItems/IncomeItems';
import ExpenseForm from './ExpenseForm';

function Expenses() {
  const {addIncome,expenses,getIncomes,getExpenses,totalExpenses,deleteIncome,totalIncome,deleteExpense,modifyExpense}=useGlobalContext()

  useEffect(()=>{
    getExpenses()
  },[])
  return (
    <div>
      <ExpenseStyled>
        <InnerLayout>
         <h1>Expenses</h1>
         <h2 className="total-income">Total Expense: 
            <span>Rs.{totalExpenses()}</span>
         </h2>
         <div className="income-content">
          <div className="form-container">
            <ExpenseForm/>

          </div>
          <div className="incomes">
            {expenses.map((expense)=>
              {
                const{ _id,title,amount,date,category,description,type}=expense;
                return <IncomeItems
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    indicatorColor={"var(--color red)"}
                    deleteItem={deleteExpense}
                    updateItem={modifyExpense}
                    />
            })}
          </div>
         </div>
        </InnerLayout>
      </ExpenseStyled>
    </div>
  )
}
const ExpenseStyled =styled.div`
    display:flex;
    overflow:auto;
    gap: 100 rem;
    .total-income{
      display:flex;
      overflow:auto;
      backgroud:FCF6F9;
    }
    .income-content{
      display:flex;
      gap: 2 rem;
      justify-content: space-between;
      width: 1000px;
    }
    .income{
      padding-left: 23px;
      flex:100
    }

`;

export default Expenses
