import React, { useEffect,useState } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';
import IncomeItems from '../IncomeItems/IncomeItems';

function Incomes() {
  const {addIncome,incomes,getIncomes,deleteIncome,totalIncome,modifyIncome,getLoginStatus}=useGlobalContext()
  const [loginStatus, setLoginStatus] = useState('');
  const [initialEffectRun, setInitialEffectRun] = useState(false);

  useEffect(() => {
    if (!initialEffectRun) {
      const fetchData = async () => {
        try {
          const status = await getLoginStatus();
          setLoginStatus(status);
          getIncomes();
        } catch (error) {
          console.error('Error fetching login status:', error);
        }
      };
      fetchData();
      setInitialEffectRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoginStatus, getIncomes, initialEffectRun]);

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
                    updateItem={modifyIncome}
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
      width: 1000px;
    }
    .income{
      padding-left: 23px;
      flex:100
    }

`;

export default Incomes
