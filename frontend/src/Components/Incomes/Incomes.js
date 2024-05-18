import React from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';

function Incomes() {
  const {addIncome}=useGlobalContext()
  return (
    <div>
      <IncomesStyled>
        <InnerLayout>
         <h1>Incomes</h1>
         <div className="income-content">
          <div className="form-container">
            <Form/>

          </div>
          <div className="incomes"></div>
         </div>
        </InnerLayout>
      </IncomesStyled>
    </div>
  )
}
const IncomesStyled =styled.div`


`;

export default Incomes
