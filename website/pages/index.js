import { Fragment, useCallback, useState, useRef } from 'react';
import Card from './../components/Card';
import BaseButton from '../components/base/BaseButton';
import BaseInput from '../components/base/BaseInput';
import styles from './home.css';
import { getPolls } from './api/polls';
import TheHeader from '../components/TheHeader';
import BaseHead from '../components/base/BaseHead';

function Home() {
	const [loading, setLoading] = useState(false);
	const [polls, setPolls] = useState([]);
	const searchRef = useRef();
	const [dateTerm, setDateTerm] = useState('');

	async function fetchPolls() {
		if (searchRef.current.value) {
			setLoading(true);
			const json = await getPolls(searchRef.current.value, dateTerm);
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
	}, [searchRef.current, dateTerm]);

	return (
		<div className="container">
			<BaseHead title="Inicio" />
			<TheHeader bgColor="#fff" />
			<div className={styles.containerHeader}>
				<div className={styles.itemHeader}>
					<BaseInput
						labelProps={{ htmlFor: 'search' }}
						inputProps={{
							id: 'search',
							ref: searchRef,
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
				{polls.length > 0 && (
					<Fragment>
						<header className={styles.headerResult}>
							{loading ? (
								<h2>Buscando...</h2>
							) : (
								<h2>Se encontraron {polls.length} votaciones</h2>
							)}
						</header>
						<section className={styles.containerLaws}>
							{polls.map((poll) => {
								return (
									<Card
										key={poll.id}
										slug={poll.slug}
										title={poll.title}
										{...poll.result}
									/>
								);
							})}
						</section>
					</Fragment>
				)}
				{polls.length === 0 && searchRef.current && (
					<header className={styles.headerResult}>
						<h2>
							No se encontraron votaciones con la palabra "
							{searchRef.current.value}"
						</h2>
					</header>
				)}
			</section>
		</div>
	);
}

export default Home;
