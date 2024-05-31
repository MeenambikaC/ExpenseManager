import React, { useState } from 'react';
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, logout, medical, money, piggy, rupee, settings, stocks, takeaway, trash, trend } from '../../Utils/Icons';
import Button from '../Button/Button';
import styled from 'styled-components';
import { Date } from '../../Utils/Date';

function IncomeItems({
    id,
    title,
    amount,
    date,
    category,
    description,
    deleteItem,
    indicatorColor,
    type,
    updateItem
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState(category);
    const [fieldToUpdate, setfieldToUpdate] = useState('amount');
    const [newValue, setnewValue] = useState(amount);

    const categoryIcon = () => {
        switch (category) {
            case 'salary':
                return money;
            case 'bonus':
                return freelance;
            case 'bank':
                return card;
            case 'gift':
                return bitcoin;
            case 'investment':
                return stocks;
            case 'mahapola':
                return stocks;
            case 'education':
                return book;
            case 'food':
                return food;
            case 'health':
                return medical;
            case 'clothing':
                return clothing;
            case 'travelling':
                return freelance;
            case 'takeaway':
                return takeaway;
            case 'bills':
                return trend;
            case 'other':
                return circle;
            case 'book':
                return book;
            default:
                return '';
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        updateItem(id, fieldToUpdate, newValue);
        setIsEditing(false);
    };

    const handleFieldChange = (e) => {
        setfieldToUpdate(e.target.value);
        setnewValue(''); // Reset value on field change
    };

    const getInputType = () => {
        switch (fieldToUpdate) {
            case 'amount':
                return 'number';
            case 'date':
                return 'date';
            case 'category':
                return 'dropdown'; // For category, return a special value indicating a dropdown
            default:
                return 'text';
        }
    };
    

    return (
        <IncomeItemsStyled indicator={indicatorColor}>
            <div className="icon">
                {categoryIcon()}
            </div>
            <div className="content">
                <h5>{title}</h5>
                <div className="inner-content">
                    <div className="text">
                        <p>{rupee} {amount}</p>
                        <p>{calender} {Date(date)}</p>
                        <p>
                            {comment}
                            {description}
                        </p>
                    </div>
                    <div className="btn-con">
                        <Button
                            icon={trash}
                            bPad={'1rem'}
                            bRad={'50%'}
                            bg={'var(--primary-color)'}
                            color={'#f00'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={() => deleteItem(id)}
                        />
                        <Button
                            icon={settings}
                            text="Edit"
                            bPad={'1rem'}
                            bRad={'5px'}
                            bg={'var(--primary-color)'}
                            color={'#4B78A8'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={handleEditClick}
                        />
                    </div>
                </div>
                {isEditing && (
                    <div className="edit-section">
                        <select
                            value={fieldToUpdate}
                            onChange={handleFieldChange}
                        >
                            <option value="title">Title</option>
                            <option value="amount">Amount</option>
                            <option value="category">Category</option>
                            <option value="date">Date</option>
                            <option value="description">Description</option>
                        </select>
                        {getInputType() === 'dropdown' ? (
                            <select
                                value={newValue}
                                onChange={(e) => setnewValue(e.target.value)}
                            >
                                <option value=""  disabled >Select Option</option>
                                <option value="salary">Salary</option>
                                <option value="bonus">Bonus</option>
                                <option value="investments">Investiments</option>
                                <option value="bank">Bank Transfer</option>  
                                <option value="mahapola">Mahapola</option> 
                                <option value="gift">Gift</option> 
                                <option value="other">Other</option>  
                                <option value="education">Education</option>
                                <option value="food">Food</option>
                                <option value="health">Health</option>
                                <option value="clothing">Clothing</option>  
                                <option value="travelling">Trevelling</option> 
                                <option value="takeaway">Takeaway</option> 
                                <option value="bills">Bills</option>  
                                <option value="book">Book</option>
                                <option value="other">Other</option>
                            </select>
                        ) : (
                        <input
                            type={getInputType()}
                            value={newValue}
                            onChange={(e) => setnewValue(e.target.value)}
                        />)}
                        <Button
                            icon={logout}
                            text="Save"
                            bPad={'1rem'}
                            bRad={'5px'}
                            bg={'var(--primary-color)'}
                            color={'#f00'}
                            iColor={'#fff'}
                            hColor={'var(--color-green)'}
                            onClick={handleSaveClick}
                        />
                    </div>
                )}
            </div>
        </IncomeItemsStyled>
    );
}

const IncomeItemsStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    .icon{
        width: 80px;
        height: 80px;
        border-radius: 20px;
        background: #F5F5F5;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 2px solid #FFFFFF;
        i{
            font-size: 2.6rem;
        }
    }
    .content{
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: .2rem;
        h5{
            font-size: 1.3rem;
            padding-left: 2rem;
            position: relative;
            &::before{
                content: '';
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: .8rem;
                height: .8rem;
                border-radius: 50%;
                background: ${props => props.indicator};
            }
        }

        .inner-content{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .text{
                display: flex;
                align-items: center;
                gap: 1.5rem;
                p{
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--primary-color);
                    opacity: 0.8;
                }
            }
        }
        .edit-section {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-top: 1rem;
            select, input {
                padding: 0.5rem;
                border: 1px solid var(--primary-color);
                border-radius: 5px;
            }
        }
    }
`;

export default IncomeItems;
