import React from 'react'
import styled from 'styled-components';
import avatar from '../../img/avatar.png'
import { menuItems } from '../../Utils/MenuItems';
import { signout } from '../../Utils/Icons';

function Navigation() {
  return (
    <NavStyled>
        <div className="user-container">
            <img src={avatar} alt=""/>
            <div className="text">
                <h2>Expense Tracker</h2>
                <p>Your Money</p>
            </div>
        </div>
        <ul className="menu-items">
            {menuItems.map((item)=>{
                return <li key={item.id}> 
                    {item.icon}
                    <span>{item.title}</span>
                </li>
            })}
        </ul>
        <div className="bottom-nav">
            <li>
                {signout} Sign out
            </li>
        </div>
    </NavStyled>
  )
}

const NavStyled = styled.nav`
    padding:2rem 1.5rem;
    width:370px;
    height:100px;

`;

export default Navigation
