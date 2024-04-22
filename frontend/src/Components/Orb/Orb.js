import React from 'react'
import styled, { keyframes } from "styled-components";
import { useWindow } from '../../Utils/UseWindow';
function Orb() {
    const {width,height}=useWindow()
    const moverOrb = keyframes`
      0%{
        transform:translate(0,0);
      }
      50%{
        transform:translate(${width/1.5}px,${height/1.5}px);
      }
      100%{
        transform:translate(0,0);
      }
    `

    const OrbStyled =styled.div`
        width:70vh;
        height:70vh;
        position:absoute;
        border-radius 50%;
        margin-top:-37vh;
        margin-left:-37vh;
        background:linear-gradient(180deg,#F56692 0%, #F2994A 100%);
        filter:blur(1000px);
        animation:${moverOrb} 15s alternate linear infinite;
    `;



  return (
    <OrbStyled>
      Orb
    </OrbStyled>
  )
}

export default Orb
