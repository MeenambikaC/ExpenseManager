import styled from "styled-components";
import React,{useMemo, useState} from "react";
import { GlobalStyle } from "./Styles/GlobalStyle";
import bg from './img/bg.png'
import { MainLayout } from "./Styles/layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Incomes from "./Components/Incomes/Incomes";
import Expenses from "./Components/Expenses/Expenses";
import { useGlobalContext } from "./Context/globalContext";
import Reminders from "./Components/Reminders/Reminders";
import LoginForm from "./Components/Login/LoginForm";
import Login from "./Components/Login/Login";

function App() {
  const [active,setActive]=useState(1)

  const global=useGlobalContext()
  console.log(global)
  const displayData=()=>{
    switch(active){
      case 2:
        return <Dashboard/>
      case 3:
        return <Dashboard/>
      case 4:
        return <Incomes/>
      case 5:
        return <Expenses/>
      case 6:
        return <Reminders/>
      case 1:
        return <Login/>
      case 7:
          return <Login/>
      default:
        return <Dashboard/>
    }
  }
  const orbMemo=useMemo(()=>{
    return <Orb/>
  },[])
  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
     <MainLayout>
      <Navigation active={active} setActive={setActive}></Navigation>
      <main> 
        {displayData()}
      </main>
     </MainLayout>
    </AppStyled>
  );
}


const AppStyled = styled.div`
  // height: 150vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1; // TODO change
    background: rgba(252, 246, 249, 0.58);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
