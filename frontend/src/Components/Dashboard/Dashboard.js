import React from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import Chart from '../Chart/Chart';

function Dashboard() {
  return (
    <div>
      <DashboardStyled>
        <InnerLayout>
          <h1>All Transcations</h1>
          <div className="stats-con">
            <div className="chart-con">
              <Chart/>
            </div>
          </div>
        </InnerLayout>
      </DashboardStyled>
    </div>
  )
}
const DashboardStyled =styled.div`


`;

export default Dashboard
