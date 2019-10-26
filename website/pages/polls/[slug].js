import { useEffect, useState } from 'react';
import BaseInput from './../../components/base/BaseInput';
import styles from './PollDetails.css';
import { getPollDetails } from './../api/polls';

function PollDetails({
	rawDate,
	title,
	totalAbst,
	totalAus,
	totalNo,
	totalSi,
	votes,
}) {
	const [searchTerm, setSearchTerm] = useState();
	const [politicians, setPoliticians] = useState(votes);

	function onChange(e) {
		setSearchTerm(e.target.value.toLowerCase());
	}

	useEffect(() => {
		if (searchTerm) {
			const filterResult = votes.filter((vote) => {
				return vote.politicianName.toLowerCase().includes(searchTerm);
			});
			setPoliticians(filterResult);
		} else {
			setPoliticians(votes);
		}
	}, [searchTerm]);

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
					<header>
						<h4>Fecha: {rawDate}</h4>
					</header>
					<section className={styles.voteSearch}>
						<BaseInput
							inputProps={{
								onChange: onChange,
								placeholder: 'Buscar Congresista',
							}}
						/>
					</section>
					<section className={styles.voteDetails}>
						{politicians.map((vote) => {
							return (
								<div key={vote.politicianId} className={styles.voteItem}>
									<p>{vote.politicianName}</p>
									<span
										title={vote.voteLabel}
										style={{ color: vote.voteColor }}
									>
										{vote.value}
									</span>
								</div>
							);
						})}
					</section>
				</section>
			</section>
		</section>
	);
}

async function getInitialProps({ query }) {
	const { slug } = query;
	const poll = await getPollDetails(slug);
	return {
		...poll,
	};
}

PollDetails.getInitialProps = getInitialProps;

export default PollDetails;
