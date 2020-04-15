import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [workload, SetWorkload] = useState('');
    const [credit, setCredit] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            id,
            name,
            workload,
            credit
        };

        try {
            const response = await api.post('disciplines', data);

            alert(`O ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça o cadastro da displina, entre na plataforma e peça dispensa da disciplina.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Código da Disciplina"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />

                    <input 
                        placeholder="Nome da Disciplina"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                    <input
                        placeholder="Carga Horária"
                        value={workload}
                        onChange={e => SetWorkload(e.target.value)}
                    />

                    <input 
                        placeholder="Crédito"
                        value={credit}
                        onChange={e => setCredit(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}