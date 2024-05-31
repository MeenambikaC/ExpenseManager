import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../../Context/globalContext';

function History() {

    const {transactionHistory}=useGlobalContext()

    const [...history]=transactionHistory()
  return (
    <HistoryStyled>
        <h2>Recent History</h2>
        {history.map((item)=>{
            const {_id,title,amount,type}=item
            return (
                <div key ={_id} className="history">
                    <p style={{
                    color:type==='expense'?'red':'green'
                    
                    }}> {title}</p>
                    <p style={{
                    color:type==='expense'?'red':'green'
                    
                    }}> 
                        {
                            type === 'expense' ? `-Rs.${amount <= 0 ? 0 : amount}` : `+Rs.${amount <= 0 ? 0: amount}` // TODO: add a RS
                        }
                    </p>
                    

                </div>
            )
        })}
      
    </HistoryStyled>
  )
}

const HistoryStyled =styled.div`
    display:flex;
    flex-direction:column;
    gap: 1rem;
    .history{
        backgroud: #FCF6F9;
        border:2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0,0,0,0.96);
        padding:4 rem;
        border-radius:10px;
        height:10%;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
`;
export default History
