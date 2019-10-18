import Card from './../components/Card';
import BaseButton from '../components/base/BaseButton';
import BaseInput from '../components/base/BaseInput';
import styles from './home.css';

function Home() {
	const poll = {
		title:
			'PROYECTO DE LEY 23: EXTENDER LA OBLIGACION DE LOS FUNCIONARIOS Y SERVIDORES PUBLICOS QUE PRESENTAR DECLARACION JURADA DE INGRESOS BIENES Y RENTAS PARA INCREMENTAR LOS ALCANCES DE LA FISCALIZACIONQUE REALIZA LA CONTRALORIA GENERAL DE LA REPUBLICA',
		totalSi: 110,
		totalNo: 0,
		totalAbst: 0,
		totalAus: 10,
	};
	return (
		<div className="container">
			<div className={styles.containerHeader}>
				<div className={styles.itemHeader}>
					<BaseInput
						labelProps={{ htmlFor: 'search' }}
						inputProps={{
							id: 'search',
							placeholder: 'Ley 298, Mocion 200, gobierno',
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
							type: 'date',
							placeholder: 'YYYY-MM-DD',
						}}
					>
						Fecha:
					</BaseInput>
				</div>
				<div className={styles.buttonHeader}>
					<BaseButton dataProps={{ style: { height: '60px' } }}>
						BUSCAR
					</BaseButton>
				</div>
			</div>
			{/* <Card {...poll} />
			<BaseInput
				labelProps={{ htmlFor: 'asd' }}
				inputProps={{ id: 'asd', placeholder: 'Ley 298, Mocion 200, gobierno' }}
			>
				Buscar Votacion:
			</BaseInput> */}
		</div>
	);
}

export default Home;
