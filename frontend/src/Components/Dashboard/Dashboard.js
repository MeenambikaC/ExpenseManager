import React, { useEffect,useState } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import Chart from '../Chart/Chart';
import { rupee } from '../../Utils/Icons';
import { useGlobalContext } from '../../Context/globalContext';
import History from '../History/History';

function Dashboard() {
  const {totalIncome,incomes,totalExpenses,totalBalance,getIncomes,getExpenses,expenses,getLoginStatus,transactionReminder}=useGlobalContext()
  const [loginStatus, setLoginStatus] = useState('');
  const [initialEffectRun, setInitialEffectRun] = useState(false);

  useEffect(() => {
    if (!initialEffectRun) {
      const fetchData = async () => {
        try {
          const status = await getLoginStatus();
          setLoginStatus(status);
          getIncomes()
          getExpenses()
        } catch (error) {
          console.error('Error fetching login status:', error);
        }
      };
      fetchData();
      setInitialEffectRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoginStatus, getIncomes,getExpenses,transactionReminder, initialEffectRun]);

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
    <div>
      <DashboardStyled>
        <InnerLayout>
          <h1>All Transcations</h1>
          <div className="stats-con">
            <div className="chart-con">
              <Chart/>
              <div className="amount-con">
                <div className="income">
                  <h2>Totoal Income</h2>
                  <p>
                    {rupee} {totalIncome()}
                  </p>
                </div>
                <div className="income">
                  <h2>Totoal Expenses</h2>
                  <p>
                    {rupee} {totalExpenses()}
                  </p>
                </div>
                <div className="balance">
                  <h2>Totoal Balance</h2>
                  <p>
                    {rupee} {totalBalance()}
                  </p>
                </div>

              </div>
              
            </div>
            <div className="history-con">
                <History/>
                <h2 className="salary-title">Min <span>Salary</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                Rs.{Math.min(...incomes.map(item => item.amount))}
                            </p>
                            <p>
                                Rs.{Math.max(...incomes.map(item => item.amount))}
                            </p>
                        </div>
                        <h2 className="salary-title">Min <span>Expense</span>Max</h2>
                        <div className="salary-item">
                            <p>
                                Rs.{Math.min(...expenses.map(item => item.amount))}
                            </p>
                            <p>
                                Rs.{Math.max(...expenses.map(item => item.amount))}
                            </p>
                        </div>
            </div>
          </div>
        </InnerLayout>
      </DashboardStyled>
    </div>
  )
}
const DashboardStyled =styled.div`
.stats-con{
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 2rem;
  .chart-con{
      grid-column: 1 / 3;
      height: 400px;
      .amount-con{
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem;
          margin-top: 2rem;
          .income, .expense{
              grid-column: span 2;
          }
          .income, .expense, .balance{
              background: #FCF6F9;
              border: 2px solid #FFFFFF;
              box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
              border-radius: 20px;
              padding: 1rem;
              height:220px;
              p{
                  font-size: 3.5rem;
                  font-weight: 700;
              }
          }

          .balance{
              grid-column: 2 / 4;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              width:300px;
              p{
                  // padding:2px;
                  color: green;
                  opacity: 0.6;
                  font-size: 4.5rem;
              }
          }
      }
  }

  .history-con{
      grid-column: 5 / ;
      h2{
          margin: 1rem 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
      }
      .salary-title{
          font-size: 1.2rem;
          padding: 2rem;
          span{
              font-size: 1.8rem;
          }
      }
      .salary-item{
          background: #FCF6F9;
          border: 2px solid #FFFFFF;
          box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
          padding: 2rem;
          border-radius: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          p{
              font-weight: 600;
              font-size: 1.6rem;
          }
      }
  }
}

`;

export default Dashboard
