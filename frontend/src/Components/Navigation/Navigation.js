import React, { useState } from 'react';
import styled from 'styled-components';
import avatar from '../../img/avatar.png';
import { menuItems } from '../../Utils/MenuItems';
import { signout } from '../../Utils/Icons';
import { useGlobalContext } from '../../Context/globalContext';

function Navigation({ active, setActive }) {
  const {addLogin,getLoginStatus}=useGlobalContext()
  const [inputState, setInputState] = useState({
    username: 'M',
    password: 'E'
  });

  const { username, password } = inputState;
  const handleSignOutClick = () => {
    addLogin(inputState);
    getLoginStatus();
  };
  return (
    <NavStyled>
      <div className="user-container">
        <img src={avatar} alt="Profile" />
        <div className="text">
          <h2>Expense Tracker</h2>
          <p>Meenambika</p>
        </div>
      </div>
      <ul className="menu-items">
      {menuItems.map((item) => {
          if (item.id === 7) {
            return (
              <React.Fragment key={item.id}>
                <div className="bottom-nav">
                  <li onClick={handleSignOutClick}>
                    {signout} Sign out
                  </li>
                </div>
              </React.Fragment>
            );
          }

          return (
            <li
              key={item.id}
              onClick={() => setActive(item.id)}
              className={active === item.id ? 'active' : ''}
            >
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}

      </ul>
      {/* <div className="bottom-nav">
        <li onClick={handleSignOutClick}>
        {signout}Sign out
        </li>
      </div> */}
    </NavStyled>
  );
}

const NavStyled = styled.nav`
  padding: 2rem 1.5rem;
  width: 370px;
  height:500px;
  background: rgba(255, 246, 249, 0.58);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;

  .user-container {
    display: flex;
    align-items: center;
    gap: 1.5rem; /* Adjust gap for better spacing */
    img {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      background: #fcf6f9;
      border: 2px solid #ffffff;
      padding: 0.2rem;
      box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    }
    .text {
      h2 {
        color: rgba(34, 34, 96, 1);
      }
      p {
        color: rgba(34, 34, 96, 0.6);
      }
    }
  }

  .menu-items {
    flex: 1;
    display: flex;
    flex-direction: column;
    li {
      display: grid;
      grid-template-columns: 40px auto;
      align-items: center;
      margin: 0.6rem 0;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.4s ease-in-out;
      color: rgba(34, 34, 96, 0.6);
      padding-left: 1rem;
      position: relative;
      i {
        color: rgba(34, 34, 96, 0.6);
        font-size: 1.8rem;
        transition: all 0.4s ease-in-out;
      }
    }
  }

  .active {
    color: rgba(34, 34, 96, 1) !important;
    i {
      color: rgba(34, 34, 96, 1) !important;
    }
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 4px;
      height: 100%;
      background: #222260;
      border-radius: 0 10px 10px 0;
    }
  }

  .bottom-nav {
    li {
      display: flex;
      align-items: center;
      color: rgba(34, 34, 96, 0.6);
      cursor: pointer;
      i {
        font-size: 1.8rem;
        margin-right: 0.5rem; /* Adjust spacing */
      }
      &:hover {
        color: rgba(34, 34, 96, 1);
      }
    }
  }
`;

export default Navigation;
