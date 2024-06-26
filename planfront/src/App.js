import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ShowUsuarios from './components/ShowUsuarios';
import CreateUsuario from './components/CreateUsuario';
import EditUsuario from './components/EditUsuario';
import Registro from './components/Registro';
import Login from './components/Login';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Mostrar la lista de usuarios primero si está autenticado */}
                    <Route path="/" element={isAuthenticated ? <ShowUsuarios /> : <Navigate to="/login" />} />
                    {/* Rutas protegidas */}
                    <Route path="/usuarios" element={isAuthenticated ? <ShowUsuarios /> : <Navigate to="/login" />} />
                    <Route path="/create" element={isAuthenticated ? <CreateUsuario /> : <Navigate to="/login" />} />
                    <Route path="/edit/:id" element={isAuthenticated ? <EditUsuario /> : <Navigate to="/login" />} />
                    {/* Rutas de autenticación */}
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
