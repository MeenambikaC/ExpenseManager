import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';
import IncomeItems from '../IncomeItems/IncomeItems';

function Incomes() {
  const {addIncome,incomes,getIncomes,deleteIncome,totalIncome}=useGlobalContext()

  useEffect(()=>{
    getIncomes()
  },[])
  return (
    <div>
      <IncomesStyled>
        <InnerLayout>
         <h1>Incomes</h1>
         <h2 className="total-income">Total Income: 
            <span>Rs.{totalIncome()}</span>
         </h2>
         <div className="income-content">
          <div className="form-container">
            <Form/>

          </div>
          <div className="incomes">
            {incomes.map((income)=>
              {
                const{ _id,title,amount,date,category,description,type}=income;
                return <IncomeItems
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    category={category}
                    type={type}
                    indicatorColor={"var(--color red)"}
                    deleteItem={deleteIncome}
                    />
            })}
          </div>
         </div>
        </InnerLayout>
      </IncomesStyled>
    </div>
  )
}
const IncomesStyled =styled.div`
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
      width: 1200px;
    }
    .income{
      padding-left: 23px;
      flex:100
    }

`;

export default Incomes
