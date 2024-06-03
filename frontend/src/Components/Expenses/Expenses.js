import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import ExpenseForm from './ExpenseForm';
import IncomeItems from '../IncomeItems/IncomeItems';

function Expenses() {
  const { expenses, totalExpenses, deleteExpense, modifyExpense, getLoginStatus ,getExpenses} = useGlobalContext();
  const [loginStatus, setLoginStatus] = useState('');
  const [initialEffectRun, setInitialEffectRun] = useState(false);

  useEffect(() => {
    if (!initialEffectRun) {
      const fetchData = async () => {
        try {
          const status = await getLoginStatus();
          setLoginStatus(status);
          getExpenses();
        } catch (error) {
          console.error('Error fetching login status:', error);
        }
      };
      fetchData();
      setInitialEffectRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoginStatus, getExpenses, initialEffectRun]);

  if (!loginStatus) {
    return <div>Loading...</div>;
  }

  // Assuming loginStatus is a string indicating login status
  console.log(loginStatus)
  const { loginStatus: status } = loginStatus;
  console.log(status)
  if (status !== 'successful') {
    return <div><h2 style={{ color: 'red' }}>Login unsuccessful. Please log in to view your expenses.</h2></div>;
  }

  return (
    <ExpenseStyled>
      <InnerLayout>
        <h1>Expenses</h1>
        <h2 className="total-income">Total Expense: <span>Rs.{totalExpenses()}</span></h2>
        <div className="income-content">
          <div className="form-container">
            <ExpenseForm />
          </div>
          <div className="incomes">
            {expenses.map((expense) => (
              <IncomeItems
                key={expense._id}
                id={expense._id}
                title={expense.title}
                description={expense.description}
                amount={expense.amount}
                date={expense.date}
                type={expense.type}
                category={expense.category}
                indicatorColor={'var(--color red)'}
                deleteItem={deleteExpense}
                updateItem={modifyExpense}
              />
            ))}
          </div>
        </div>
      </InnerLayout>
    </ExpenseStyled>
  );
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
