// import React from 'react'
// import {Chart as ChartJs, CategoryScale,LinearScale,
//     PointElement,LineElement,Title,Tooltip,Legend,ArcElement} 
//     from 'chart.js'

// import {Line} from 'react-chartjs-2'
// import styled from 'styled-components'
// import { useGlobalContext } from '../../Context/globalContext'
// import { Date } from '../../Utils/Date'

// ChartJs.register(CategoryScale,LinearScale,
//     PointElement,Title,LineElement,Tooltip,Legend,ArcElement)
// function Chart() {
//     const {incomes,expenses}=useGlobalContext()
//     const data={
//         labels:incomes.map((inc)=>{
//             const {date}=inc
//             return Date(date)
//         }),
//         datasets:[
//             {
//                 label:'Income',
//                 data:[
//                     ...incomes.map((income)=>{
//                         const {amount}=income
//                         return amount
//                     })
//                 ],
//                 backgroundColor:'green',
//                 tension:.2
//             },
//             {
//                 label:'Expenses',
//                 data:[
//                     ...expenses.map((expense)=>{
//                         const {amount}=expense
//                         return amount
//                     })
//                 ],
//                 backgroundColor:'red',
//                 tension:.2
//             }
//         ]
//     }
//   return (
//     <ChartStyled>
//       <Line data={data}/>
//     </ChartStyled>
//   )
// }
// const ChartStyled = styled.div`
//     backgroud: #FCF6F9;
//     border:2px solid #FFFFFF;
//     box-shadow: 0px 1px 15px rgba(0,0,0,0.96);
//     padding:1 rem;
//     border-radius:20px;
//     height:100%
// `;
// export default Chart
import React from 'react'
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'
import { Line } from 'react-chartjs-2'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext'
import { format, subDays, eachDayOfInterval } from 'date-fns'

ChartJs.register(CategoryScale, LinearScale, PointElement, Title, LineElement, Tooltip, Legend, ArcElement)

function Chart() {
    const { incomes, expenses } = useGlobalContext()
    const oneMonthAgo = subDays(new Date(), 30)

    // Generate a list of all dates in the last month
    const allDates = eachDayOfInterval({
        start: oneMonthAgo,
        end: new Date()
    }).map(date => format(date, 'yyyy-MM-dd'))

    // Helper function to filter and sort data, and merge with allDates
    const filterAndMergeData = (data) => {
        const filteredData = data
            .filter((item) => new Date(item.date) >= oneMonthAgo)
            .sort((a, b) => new Date(a.date) - new Date(b.date))

        const mergedData = allDates.map(date => {
            const item = filteredData.find(d => format(new Date(d.date), 'yyyy-MM-dd') === date)
            return item ? item.amount : 0
        })

        return mergedData
    }

    // Filter and merge incomes and expenses
    const mergedIncomes = filterAndMergeData(incomes)
    const mergedExpenses = filterAndMergeData(expenses)

    const data = {
        labels: allDates,
        datasets: [
            {
                label: 'Income',
                data: mergedIncomes,
                backgroundColor: 'green',
                borderColor: 'green',
                pointRadius: mergedIncomes.map(value => value === 0 ? 0 : 3),  // Set point radius conditionally
                tension: 0.2,
                fill: false
            },
            {
                label: 'Expenses',
                data: mergedExpenses,
                backgroundColor: 'red',
                borderColor: 'red',
                pointRadius: mergedExpenses.map(value => value === 0 ? 0 : 3),  // Set point radius conditionally
                tension: 0.2,
                fill: false
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data} />
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.96);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`

export default Chart
