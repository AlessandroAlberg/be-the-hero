import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewStudent() {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [registration, setRegistration] = useState('');

    const history =  useHistory();

    const disciplineId = localStorage.getItem('disciplineId');

    async function handleNewStudent(e) {
        e.preventDefault();

        const data = {
            name,
            cpf,
            registration,
        };

        try {
            await  api.post('students', data, {
                headers: {
                    Authorization: disciplineId,
                }
            })

            history.push('/profile');
        } catch (err) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className="new-student-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo aluno</h1>
                    <p>Preencha os dados do aluno que está pedindo despensa.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewStudent}>
                    <input 
                        placeholder="Nome do Aluno"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <textarea 
                        placeholder="CPF"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                    />
                    <input 
                        placeholder="Matrícula"
                        value={registration}
                        onChange={e => setRegistration(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}