import React, { useState } from 'react'
import styled from 'styled-components'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
function Form() {
    const [inputState,setInputState]=useState({
        "title": '',
        "amount": '',
        "type": '',
        "date": '',
        "catagory": '',
        "description": ''
    })

    const {title,amount,type,date,catagory,description}=inputState
    
    const handleInput = name=>e=>{
        setInputState({...inputState,[name]:e.target.value})
    }
    return (
        <FormStyled>
            <div className="input-control">
                <input 
                    type="text"
                    value={title}
                    name={'title'}
                    placeholder='Salary Title'
                    onChange={handleInput('title')}    
                />
            </div>
            <div className="imput-control">
                <input 
                    type="text"
                    value={amount}
                    placeholder='Salary Amount'
                    onChange={handleInput('amount')}    
                />
            </div>
            <div className="input-control">
                <DatePicker 
                    id='date'
                    placeholderText='Enter A Date'
                    seleted={date}
                    dateFormat="dd/MM/yyyy"
                    onChange={(date)=>{
                        setInputState({...inputState, date:date})
                    }}
                />
            </div>
            <div className="input-control">
                <select required value={catagory} name="catagory" id="catagory">
                    <option value="" disabled>Select Option</option>
                    <option value="Salary" >Salary</option>
                    <option value="From Parents" >From Parents</option>
                    <option value="Other" >Other</option>
                </select>
            </div>
        </FormStyled>
  )
}


const FormStyled=styled.form`

`;
export default Form
