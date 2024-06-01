import React, { useEffect } from 'react'
import styled from 'styled-components';
import { InnerLayout } from '../../Styles/layouts';
import { useGlobalContext } from '../../Context/globalContext';
import Form from '../Forms/Form';
import IncomeItems from '../IncomeItems/IncomeItems';
import ReminderForm from './ReminderForm';

function Reminders() {
  const {reminders,getReminders,totalReminder,deleteReminder,modifyReminder}=useGlobalContext()

  useEffect(()=>{
    getReminders()
  },[])
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
                const{ _id,title,amount,date,category,description,type}=reminder;
                return <IncomeItems
                    key={_id}
                    id={_id}
                    title={title}
                    description={description}
                    amount={amount}
                    date={date}
                    type={type}
                    category={category}
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
