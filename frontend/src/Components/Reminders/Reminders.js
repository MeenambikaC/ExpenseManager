import React, { useEffect,useState } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';
import IncomeItems from '../IncomeItems/IncomeItems';
import ReminderForm from './ReminderForm';

function Reminders() {
  const {reminders,getReminders,totalReminder,deleteReminder,modifyReminder,getLoginStatus}=useGlobalContext()
  const [loginStatus, setLoginStatus] = useState('');
  const [initialEffectRun, setInitialEffectRun] = useState(false);

  useEffect(() => {
    if (!initialEffectRun) {
      const fetchData = async () => {
        try {
          const status = await getLoginStatus();
          setLoginStatus(status);
          getReminders();
        } catch (error) {
          console.error('Error fetching login status:', error);
        }
      };
      fetchData();
      setInitialEffectRun(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getLoginStatus, getReminders, initialEffectRun]);

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
      <RemindersStyled>
        <InnerLayout>
         <h1>Reminders</h1>
         <h2 className="total-income">Total Reminder Amount: 
            <span>Rs.{totalReminder()}</span>
         </h2>
         <div className="income-content">
          <div className="form-container">
            <ReminderForm/>

          </div>
          <div className="incomes">
            {reminders.map((reminder)=>
              {
                const{ _id,title,amount,date,category,description,type,email}=reminder;
                return <IncomeItems
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
                    email={email}
                    indicatorColor={"var(--color red)"}
                    deleteItem={deleteReminder}
                    updateItem={modifyReminder}
                    />
            })}
          </div>
         </div>
        </InnerLayout>
      </RemindersStyled>
    </div>
  )
}
const RemindersStyled =styled.div`
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

export default Reminders
