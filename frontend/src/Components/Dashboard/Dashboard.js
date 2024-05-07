import React from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';

function Dashboard() {
  return (
    <div>
      <DashboardStyled>
        <InnerLayout>
          Dashboard
        </InnerLayout>
      </DashboardStyled>
    </div>
  )
}
const DashboardStyled =styled.div`


`;

export default Dashboard
