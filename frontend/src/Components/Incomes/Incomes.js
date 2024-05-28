import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';
import IncomeItems from '../IncomeItems/IncomeItems';

function Incomes() {
  const {addIncome,incomes,getIncomes}=useGlobalContext()

  useEffect(()=>{
    getIncomes()
  },[])
  return (
    <div>
      <IncomesStyled>
        <InnerLayout>
         <h1>Incomes</h1>
         <div className="income-content">
          <div className="form-container">
            <Form/>

          </div>
          <div className="incomes">
            {incomes.map((income)=>
              {
                const{ _id,title,amount,date,category,description}=income;
                return <IncomeItems
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    category={category}
                    indicatorColor={"var(--color red)"}
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
    .income-content{
      gap: 1000 rem;
    }
    .income{
      flex:100
    }

`;

export default Incomes
