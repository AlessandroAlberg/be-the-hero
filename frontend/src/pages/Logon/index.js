import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Logon() {
    const [id, setId] = useState('');
    const [students, setStudents] = useState([]);
    const history = useHistory();
    const [disciplines, setDiscipline] = useState([]);

    useEffect(() => {
        api.get('disciplines'
        ).then(response => {
            setDiscipline(response.data);
        })
    }, [id]);

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: id,
            }
        }).then(response => {
            setStudents(response.data);
        })
    }, [id]);

    async function handleDeleteDiscipline(id) {
        try {
            await students.map(student => (api.delete(`students/${student.id}`)));
            await api.delete(`disciplines/${id}`);

            setDiscipline(disciplines.filter(discipline => discipline.id !== id));
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente.');
        }
    }

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('disciplineId', id);
            localStorage.setItem('disciplineName', response.data.name);

            history.push('/profile');
        } catch (err) {
            alert('Falha no login, tente novamente.');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Código da Disciplina" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <button className="button" type="submit">Entrar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Cadastrar Disciplina
                    </Link>
                </form>
            </section>

            <div className="profile-container">

                <h1>Disciplinas</h1>

                <ul>
                    {disciplines.map(discipline => (
                        <li key={discipline.id}>
                            <strdiscipline>CÓDIGO:</strdiscipline>
                            <p>{discipline.id}</p>

                            <strdiscipline>NOME DA DISCIPLINA:</strdiscipline>
                            <p>{discipline.name}</p>

                            <strdiscipline>CARGA HORÁRIA:</strdiscipline>
                            <p>{discipline.workload}</p>

                            <strdiscipline>CRÉDITO:</strdiscipline>
                            <p>{discipline.credit}</p>

                            <button onClick={() => handleDeleteDiscipline(discipline.id)} type="button">
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}