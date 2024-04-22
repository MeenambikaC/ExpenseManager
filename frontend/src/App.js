import styled from "styled-components";
// import { GlobalStyle } from "./Styles/GlobalStyle";
import bg from './img/bg.png'
import { MainLayout } from "./Styles/layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";
function App() {
  return (
    <AppStyled bg={bg} className="App">
      <Orb/>
     <MainLayout>
      <Navigation></Navigation>
     </MainLayout>
    </AppStyled>
  );
}


const AppStyled = styled.div`
  height: 100vh; 
  background-image: url(${props => props.bg});
  background-repeat: no-repeat;
  background-size: cover; 
  background-position: center; 
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default App;
