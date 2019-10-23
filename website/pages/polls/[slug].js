import BaseInput from './../../components/base/BaseInput';
import styles from './PollDetails.css';

function PollDetails() {
	return (
		<section>
			<section className={styles.containerHeader}>
				<header className={styles.header}>
					<h1 className={styles.title}>
						PROYECTO DE LEY 23: EXTENDER LA OBLIGACION DE LOS FUNCIONARIOS Y
						SERVIDORES PUBLICOS QUE PRESENTAR DECLARACION JURADA DE INGRESOS
						BIENES Y RENTAS PARA INCREMENTAR LOS ALCANCES DE LA FISCALIZACIONQUE
						REALIZA LA CONTRALORIA GENERAL DE LA REPUBLICA
					</h1>
				</header>
				<section className={styles.containerResume}>
					<div className={styles.cardVotes}>
						<span className={`${styles.cardVoteItem} ${styles.voteTextSi}`}>
							Si: 20
						</span>
						<span className={`${styles.cardVoteItem} ${styles.voteTextNo}`}>
							No: 100
						</span>
						<span className={`${styles.cardVoteItem} ${styles.voteTextAbst}`}>
							Abst: 5
						</span>
						<span className={`${styles.cardVoteItem} ${styles.voteTextAus}`}>
							Aus: 5
						</span>
					</div>
				</section>
			</section>
			<section className={styles.containerResult}>
				<section className={styles.containerVotes}>
					<section className={styles.voteSearch}>
						<BaseInput inputProps={{ placeholder: 'Buscar Congresista' }} />
					</section>
					<section className={styles.voteDetails}>
						<div className={styles.voteItem}>
							<p>ACUÑA NUÑEZ, RICHARD</p>
							<span className={styles.voteTextSi}>SI</span>
						</div>
						<div className={styles.voteItem}>
							<p>ACUÑA NUÑEZ, RICHARD</p>
							<span className={styles.voteTextNo}>No</span>
						</div>
						<div className={styles.voteItem}>
							<p>OLAECHEA ALVAREZ CALDERON, PEDRO</p>
							<span className={styles.voteTextNo}>No</span>
						</div>
					</section>
				</section>
			</section>
		</section>
	);
}

export default PollDetails;
