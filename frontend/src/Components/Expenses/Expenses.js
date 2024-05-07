import React from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';

function Expenses() {
  return (
    <div>
      <ExpensesStyled> 
        <InnerLayout>
          Expenses
        </InnerLayout>
      </ExpensesStyled>
    </div>
  )
}
const ExpensesStyled =styled.div`


`;

export default Expenses
