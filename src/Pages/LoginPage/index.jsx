import React, { useState, useContext } from "react";
import './styles.css';
import { AuthContext } from "../../contexts/auth";



const LoginPage = () => {

    const { authenticaded, user, login } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleLogin = async () => {
        login(email, password)
    }


    return(
    <div id="login">
        <h1 className="title">Login</h1>
        <p> Autheticated: {JSON.stringify(authenticaded)}</p>
        <p> Email: {JSON.stringify(email)}</p>

        <div className="form">
            <div className="field">
                <label htmlFor="email">Email:</label>
                <input 
                type="email" 
                name="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="field">
                <label htmlFor="senha">Password:</label>
                <input 
                type="password" 
                name="password" 
                id="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="actions">
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    </div>
    )
};

export default LoginPage;