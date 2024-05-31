import React, { useContext, useState } from "react"
import axios from 'axios'


// const BASE_URL = "https://expense-manager-vj1a-git-main-meenambikacs-projects.vercel.app/api/v1/";

const BASE_URL="http://localhost:5000/api/v1/"
const GlobalContext = React.createContext()

export const GlobalProvider = ({children}) => {

    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [error, setError] = useState(null)

    //calculate incomes
    const addIncome = async (income) => {
        const response = await axios.post(`${BASE_URL}add-income`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getIncomes()
    }

    const getIncomes = async () => {
        const response = await axios.get(`${BASE_URL}get-incomes`)
        setIncomes(response.data)
        console.log(response.data)
    }

    const deleteIncome = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-income/${id}`)
        getIncomes()
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }
    console.log(totalIncome())


    // //calculate expense
    const addExpense = async (expense) => {
        const response = await axios.post(`${BASE_URL}add-expense`, expense)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await axios.get(`${BASE_URL}get-expenses`)
        setExpenses(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await axios.delete(`${BASE_URL}delete-expense/${id}`)
        getExpenses()
    }

    const modifyIncome = async (id, fieldToUpdate, newValue) => {
        try {
            const res = await axios.put(`${BASE_URL}modify-income/${id}`, {
                fieldToUpdate,
                newValue
            });
            getIncomes(); // Assuming getExpenses is a function that fetches and updates the expenses after modification
        } catch (error) {
            console.error('Error modifying expense:', error);
        }
    }
    const modifyExpense = async (id, fieldToUpdate, newValue) => {
        try {
            const res = await axios.put(`${BASE_URL}modify-expense/${id}`, {
                fieldToUpdate,
                newValue
            });
            getExpenses(); // Assuming getExpenses is a function that fetches and updates the expenses after modification
        } catch (error) {
            console.error('Error modifying expense:', error);
        }
    }

    const totalExpenses = () => {
        let totalExpense = 0;
        expenses.forEach((expense) =>{
            totalExpense = totalExpense + expense.amount
        })

        return totalExpense;
    }


    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 4)
    }


    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncomes,
            incomes,
            deleteIncome,
            totalIncome,
            expenses,
            addExpense,
            getExpenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError,
            modifyIncome,
            modifyExpense
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () =>{
    return useContext(GlobalContext)
}