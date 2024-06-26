import React from 'react'
import {Chart as ChartJs, CategoryScale,LinearScale,
    PointElement,LineElement,Title,Tooltip,Legend,ArcElement} 
    from 'chart.js'

import {Line} from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext'
import { Date } from '../../Utils/Date'

ChartJs.register(CategoryScale,LinearScale,
    PointElement,Title,LineElement,Tooltip,Legend,ArcElement)
function Chart() {
    const {incomes,expenses}=useGlobalContext()
    const data={
        labels:incomes.map((inc)=>{
            const {date}=inc
            return Date(date)
        }),
        datasets:[
            {
                label:'Income',
                data:[
                    ...incomes.map((income)=>{
                        const {amount}=income
                        return amount
                    })
                ],
                backgroundColor:'green',
                tension:.2
            },
            {
                label:'Expenses',
                data:[
                    ...expenses.map((expense)=>{
                        const {amount}=expense
                        return amount
                    })
                ],
                backgroundColor:'red',
                tension:.2
            }
        ]
    }
  return (
    <ChartStyled>
      <Line data={data}/>
    </ChartStyled>
  )
}
const ChartStyled = styled.div`
    backgroud: #FCF6F9;
    border:2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.96);
    padding:1 rem;
    border-radius:20px;
    height:100%
`;
export default Chart
