import fetch from 'node-fetch';
import BaseInput from './../../components/base/BaseInput';
import styles from './PollDetails.css';

function PollDetails({ title, totalAbst, totalAus, totalNo, totalSi, votes }) {
	return (
		<section>
			<section className={styles.containerHeader}>
				<header className={styles.header}>
					<h1 className={styles.title}>{title}</h1>
				</header>
				<section className={styles.containerResume}>
					<div className={styles.cardVotes}>
						<span className={`${styles.cardVoteItem} ${styles.voteTextSi}`}>
							Si: {totalSi}
						</span>
						<span className={`${styles.cardVoteItem} ${styles.voteTextNo}`}>
							No: {totalNo}
						</span>
						<span className={`${styles.cardVoteItem} ${styles.voteTextAbst}`}>
							Abst: {totalAbst}
						</span>
						<span className={`${styles.cardVoteItem} ${styles.voteTextAus}`}>
							Aus: {totalAus}
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
						{votes.map((vote) => {
							return (
								<div key={vote.politicianId} className={styles.voteItem}>
									<p>{vote.politicianId}</p>
									<span className={styles.voteTextSi}>{vote.value}</span>
								</div>
							);
						})}
					</section>
				</section>
			</section>
		</section>
	);
}

const BASE_URL = 'https://perulitico-api-n3mrko2g5.now.sh';
const SEARCH_URL = 'polls';

async function getInitialProps({ query }) {
	const { slug } = query;
	const response = await fetch(`${BASE_URL}/${SEARCH_URL}/${slug}`);
	const poll = await response.json();
	return {
		...poll,
	};
}

PollDetails.getInitialProps = getInitialProps;

export default PollDetails;
