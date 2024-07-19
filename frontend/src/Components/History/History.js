import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/globalContext';

const isToday = (dateString) => {
    const today = new Date().toISOString().split('T')[0];
    const date = new Date(dateString).toISOString().split('T')[0];
    return today === date;
};

function History() {
    const { transactionHistory, transactionReminder, sendMail } = useGlobalContext();
    const [emailSent, setEmailSent] = useState(false);

    const history = transactionHistory();
    const reminder = transactionReminder();

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const sentStatus = localStorage.getItem(`emailSent_${today}`);
        
        if (!sentStatus) {
            const todayReminders = reminder.filter(item => isToday(item.date));
            if (todayReminders.length > 0) {
                sendMail();
                setEmailSent(true);
                localStorage.setItem(`emailSent_${today}`, true);
            }
        } else {
            setEmailSent(true);
        }
    }, [reminder, sendMail]);

    return (
        <HistoryStyled>
            <h2>Recent History</h2>
            {history.map((item) => {
                const { _id, title, amount, type } = item;
                return (
                    <div key={_id} className="history">
                        <p style={{ color: type === 'expense' ? 'red' : 'green' }}>{title}</p>
                        <p style={{ color: type === 'expense' ? 'red' : 'green' }}>
                            {type === 'expense' ? `-Rs.${amount <= 0 ? 0 : amount}` : `+Rs.${amount <= 0 ? 0 : amount}`}
                        </p>
                    </div>
                );
            })}

            <h2>Reminders for Today</h2>
            {reminder.map((item) => {
                const { _id, title, amount, date } = item;
                return (
                    <div key={_id} className="history">
                        <p style={{ color: 'red' }}>{title}</p>
                        <p style={{ color: 'red' }}>{new Date(date).toISOString().split('T')[0]}</p>
                        <p style={{ color: 'red' }}>
                            `-Rs.${amount <= 0 ? 0 : amount}`
                        </p>
                    </div>
                );
            })}
        </HistoryStyled>
    );
}

const HistoryStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    .history {
        background: #FCF6F9;
        border: 2px solid #FFFFFF;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.96);
        padding: 2rem;
        border-radius: 10px;
        height: 10%;
        align-items: center;
        display: flex;
        justify-content: space-between;
    }
`;

export default History;
