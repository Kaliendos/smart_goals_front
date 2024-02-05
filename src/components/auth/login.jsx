import React, { useContext, useEffect, useState } from "react";
import { get_auth_token } from "./request";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
 


    const handleEmailChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const tokens = await get_auth_token(username, password);
            if (tokens.status === 200) {
                navigate("/")
                window.location.reload();
            } else {
                // Обработка ошибки при неудачной авторизации
                // Например, вывод сообщения об ошибке
                alert("Ошибка авторизации");
            }
        } catch (error) {
            // Обработка ошибки при получении токенов авторизации
            // Например, вывод сообщения об ошибке или детали ошибки
            console.error("Ошибка при получении токенов авторизации:", error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Email:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={handleEmailChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Пароль:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button type="submit">Войти</button>
        </form>
    );
}
export default LoginForm;