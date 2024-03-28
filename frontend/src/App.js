import styled from "styled-components";
// import { GlobalStyle } from "./Styles/GlobalStyle";
import bg from './img/bg.png'

function App() {
  return (
    <AppStyled bg={bg} className="App">
      
    </AppStyled>
  );
}


const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  background-repeat: no-repeat; /* Prevent image from repeating */
  background-size: cover; /* Cover the entire container */
  position: relative;
`;
export default App;
