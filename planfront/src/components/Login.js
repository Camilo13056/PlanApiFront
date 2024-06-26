import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const endpoint = 'http://localhost/Plan-Api/public/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordApp, setPasswordApp] = useState(''); // Agregar state para password_app
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            // Validar que passwordApp no esté vacío u otro criterio necesario
            if (!passwordApp) {
                console.error('Password App es requerido');
                return;
            }

            const response = await axios.post(`${endpoint}/login`, {
                email,
                password,
                password_app: passwordApp // Enviar password_app al servidor
            });
            console.log('Inicio de sesión exitoso', response.data);
            navigate('/usuarios');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email:</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Password App:</label>
                    <input 
                        type="password" 
                        value={passwordApp} 
                        onChange={(e) => setPasswordApp(e.target.value)} 
                    />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
