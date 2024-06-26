import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const endpoint = 'http://localhost/Plan-Api/public/api';

const ShowUsuarios = ({ token }) => {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  const getAllUsuarios = useCallback(async () => {
    try {
      const response = await axios.get(`${endpoint}/usuarios`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (Array.isArray(response.data.usuarios)) {
        setUsuarios(response.data.usuarios);
      } else {
        console.error("Se esperaba un arreglo pero se recibió:", response.data);
      }
    } catch (error) {
      console.error("Error al obtener los datos: ", error);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      getAllUsuarios();
    }
  }, [token, navigate, getAllUsuarios]);

  const deleteUsuario = async (id) => {
    try {
      await axios.delete(`${endpoint}/usuarios/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      getAllUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario: ", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-grid gap-2 mb-4">
        <Link to="/create" className="btn btn-success btn-lg text-white">Crear Usuario</Link>
      </div>

      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Monto del Crédito</th>
            <th>Motivo del Crédito</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(usuarios) && usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td>{usuario.name}</td>
                <td>{usuario.email}</td>
                <td>{usuario.phone}</td>
                <td>{usuario.monto_credito}</td>
                <td>{usuario.motivo_credito}</td>
                <td>
                  <Link to={`/edit/${usuario.id}`} className="btn btn-warning btn-sm me-2">Editar</Link>
                  <button onClick={() => deleteUsuario(usuario.id)} className="btn btn-danger btn-sm">Eliminar</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">No hay datos disponibles</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUsuarios;
