import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios/axiosconfig';
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = 'http://localhost/Plan_Api/public/api';

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
            navigate('/usuario');
        } catch (error) {
            console.error('Error al iniciar sesión', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title mb-4">Login</h2>
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input 
                                        type="email" 
                                        className="form-control"
                                        id="email"
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password:</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        id="password"
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="passwordApp" className="form-label">Password App:</label>
                                    <input 
                                        type="password" 
                                        className="form-control"
                                        id="passwordApp"
                                        value={passwordApp} 
                                        onChange={(e) => setPasswordApp(e.target.value)} 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            <div className="mt-3">
                                <p>No tienes cuenta? <a href="./Registro">Regístrate aquí</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
