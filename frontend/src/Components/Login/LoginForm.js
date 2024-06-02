import React, { useState } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../Context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../Utils/Icons';

function LoginForm() {
    const { login, error, setError,addLogin } = useGlobalContext();
    const [inputState, setInputState] = useState({
        username: '',
        password: ''
    });

    const { username, password } = inputState;
    const handleInput = name => e => {
        setInputState({ ...inputState, [name]: e.target.value });
        setError('');
    };

    const handleSubmit = e => {
        e.preventDefault();
        addLogin(inputState);
        setInputState({
            username: '',
            password: ''
        });
    };

    return (
        <Container>
            <LoginFormStyled onSubmit={handleSubmit}>
                {error && <p className='error'>{error}</p>}
                <div className="input-control">
                    <input
                        type="text"
                        value={username}
                        name={'username'}
                        placeholder="Username"
                        onChange={handleInput('username')}
                    />
                </div>
                <div className="input-control">
                    <input
                        value={password}
                        type="password"
                        name={'password'}
                        placeholder={'Enter Password'}
                        onChange={handleInput('password')}
                    />
                </div>
                <div className="submit-btn">
                    <Button
                        name={'Login'}
                        icon={plus}
                        bPad={'.8rem 1.6rem'}
                        bRad={'30px'}
                        bg={'#100'}
                        color={'#f00'}
                    />
                </div>
            </LoginFormStyled>
        </Container>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    height: 100vh;
    width: 100vw;
    padding: 20px;
`;

const LoginFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    padding: 20px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.8);
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.1);
    gap: 1rem;
    input, textarea, select {
        font-family: inherit;
        font-size: 1rem;
        outline: none;
        border: none;
        padding: 0.75rem 1rem;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        background: #f9f9f9;
        box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
        color: rgba(34, 34, 96, 0.9);
        transition: all 0.3s ease-in-out;
        &::placeholder {
            color: rgba(34, 34, 96, 0.6);
        }
        &:focus {
            border-color: rgba(34, 34, 96, 0.3);
            box-shadow: 0px 0px 10px rgba(34, 34, 96, 0.1);
        }
    }
    .input-control {
        width: 100%;
    }
    .submit-btn {
        display: flex;
        justify-content: center;
        button {
            padding: 0.8rem 1.6rem;
            border-radius: 30px;
            border: none;
            background: #100;
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease-in-out;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover {
                background: #dfc !important;
                box-shadow: 0px 1px 15px rgba(255, 0, 0, 0.2);
            }
        }
    }
    .error {
        color: red;
        font-size: 0.875rem;
        text-align: center;
    }
`;

export default LoginForm;
