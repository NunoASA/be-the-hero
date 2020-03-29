import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from "react-icons/fi";

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Logon() {
	const [incicents, setIncindets] = useState([]);
	const ongId = localStorage.getItem('ongId');
	const ongName = localStorage.getItem('ongName');
	const history = useHistory();

	useEffect(() => {
		api.get('profile', {
			headers: {
				Authorization: ongId,
			}
		}).then(res => {
			setIncindets(res.data)
		})
	}, [ongId])

	async function handleDeleteIncident(id) {
		try {
			await api.delete(`incidents/${id}`, {
				headers: {
					Authorization: ongId
				}
			})

			setIncindets(incicents.filter(incident => incident.id !== id))
		} catch (err) {
			alert('Erro ao Deletar')
		}
	}

	function handleLogout() {
		localStorage.clear();

		history.push('/')
	}

	return (
		<div className="profile-container">
			<header>
				<img src={logoImg} alt="Be the Hero" />
				<span>Bem vinda, {ongName}</span>

				<Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
				<button onClick={handleLogout} type="button">
					<FiPower size={18} color="#E02041" />

				</button>
			</header>
			<h1>Casos casdastrados</h1>
			<ul>
				{incicents.map(incicent => (
					<li key={incicent.id}>
						<strong>CASO:</strong>
						<p>{incicent.title}</p>

						<strong>DESCRICAO:</strong>
						<p>{incicent.description}</p>


						<strong>VALOR:</strong>
						<p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incicent.value)}</p>

						<button onClick={() => handleDeleteIncident(incicent.id)} type="button">
							<FiTrash2 size={20} color="#a8a8b3" />
						</button>
					</li>)
				)}
			</ul>


		</div>
	)
}