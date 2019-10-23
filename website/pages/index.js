import { useState, useCallback } from 'react';
import Card from './../components/Card';
import BaseButton from '../components/base/BaseButton';
import BaseInput from '../components/base/BaseInput';
import styles from './home.css';

const BASE_URL = 'https://perulitico-api-n3mrko2g5.now.sh';
const SEARCH_URL = '/polls';

function Home() {
	const [loading, setLoading] = useState(false);
	const [polls, setPolls] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [dateTerm, setDateTerm] = useState('');

	async function fetchPolls() {
		if (searchTerm) {
			setLoading(true);
			const response = await fetch(
				`${BASE_URL}${SEARCH_URL}?search=${searchTerm}&date=${dateTerm}`,
			);
			const json = await response.json();
			setPolls(json);
			setLoading(false);
			return json;
		} else {
			alert('Ingrese el termino a buscar');
		}
	}

	function onSearch() {
		searchPolls();
	}

	const searchPolls = useCallback(() => {
		fetchPolls();
	}, [searchTerm, dateTerm]);

	return (
		<div className="container">
			<div className={styles.containerHeader}>
				<div className={styles.itemHeader}>
					<BaseInput
						labelProps={{ htmlFor: 'search' }}
						inputProps={{
							id: 'search',
							onChange: (e) => setSearchTerm(e.target.value),
							placeholder: 'mocion, gobierno, coima, ministro, etc',
						}}
					>
						Buscar Votacion:
					</BaseInput>
				</div>
				<div className={styles.itemDate}>
					<BaseInput
						labelProps={{ htmlFor: 'date' }}
						inputProps={{
							id: 'date',
							onChange: (e) => {
								setDateTerm(e.target.value);
							},
							pattern: '[0-9]{4}-[0-9]{2}-[0-9]{2}',
							type: 'date',
						}}
					>
						Fecha:
					</BaseInput>
				</div>
				<div className={styles.buttonHeader}>
					<BaseButton
						dataProps={{ onClick: onSearch, style: { height: '60px' } }}
					>
						BUSCAR
					</BaseButton>
				</div>
			</div>
			<section className={styles.containerResult}>
				<header className={styles.headerResult}>
					{loading ? <h2>Buscando...</h2> : <h2>Resultados</h2>}
				</header>
				<section className={styles.containerLaws}>
					{polls.map((poll) => {
						return <Card key={poll.id} {...poll} />;
					})}
				</section>
			</section>
		</div>
	);
}

export default Home;
