import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile() {
    const [students, setStudents] = useState([]);

    const history  = useHistory();

    const disciplineId = localStorage.getItem('disciplineId');
    const disciplineName = localStorage.getItem('disciplineName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: disciplineId,
            }
        }).then(response => {
            setStudents(response.data);
        })
    }, [disciplineId]);

    async function handleDeleteStudent(id) {
        try {
            await api.delete(`students/${id}`, {
                headers: {
                    Authorization: disciplineId,
                }
            });

            setStudents(students.filter(student => student.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem vindo, {disciplineName}</span>

                <Link className="button" to="/student/new">Pedir dispensa</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Pedidos de Dispensa</h1>

            <ul>
                {students.map(student => (
                    <li key={student.id}>
                        <strdiscipline>NOME DO ALUNO:</strdiscipline>
                        <p>{student.name}</p>

                        <strdiscipline>CPF:</strdiscipline>
                        <p>{student.cpf}</p>

                        <strdiscipline>MATRÍCULA:</strdiscipline>
                        <p>{student.registration}</p>

                        <button onClick={() => handleDeleteStudent(student.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}