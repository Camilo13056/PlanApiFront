import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = 'http://localhost/Plan_Api/public/api';

const CreateUsuario = () => {
    const navigate = useNavigate(); // Hook de React Router para la navegación
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        monto_credito: '',
        motivo_credito: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${endpoint}/usuarios`, formData);
            console.log('Usuario creado:', response.data);
            // Limpiar el formulario después de la creación exitosa
            setFormData({
                name: '',
                email: '',
                phone: '',
                password: '',
                monto_credito: '',
                motivo_credito: ''
            });
            alert('Usuario creado exitosamente');
            // Redirigir al usuario al inicio de sesión
            navigate('/login');
        } catch (error) {
            console.error('Error al crear usuario:', error);
            alert('Error al crear usuario');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Crear Usuario</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Teléfono</label>
                                    <input type="text" className="form-control" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Contraseña</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>
                                {/* Nuevos campos */}
                                <div className="mb-3">
                                    <label htmlFor="monto_credito" className="form-label">Monto de Crédito</label>
                                    <input type="number" className="form-control" id="monto_credito" name="monto_credito" value={formData.monto_credito} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="motivo_credito" className="form-label">Motivo de Crédito</label>
                                    <input type="text" className="form-control" id="motivo_credito" name="motivo_credito" value={formData.motivo_credito} onChange={handleChange} required />
                                </div>
                                {/* Fin de nuevos campos */}
                                <button type="submit" className="btn btn-primary btn-block">Crear</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateUsuario;
