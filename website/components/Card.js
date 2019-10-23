import React from 'react';
import styles from './Card.css';

function Card({ slug, title, totalAbst, totalAus, totalSi, totalNo }) {
	return (
		<div className={styles.cardItem}>
			<a href={`/polls/${slug}`} className={styles.cardTitle}>
				{title}
			</a>
			<div className={styles.cardVotes}>
				<span className={styles.voteTextSi}>Si: {totalSi}</span>
				<span className={styles.voteTextNo}>No: {totalNo}</span>
				<span className={styles.voteTextAbst}>Abst: {totalAbst}</span>
				<span className={styles.voteTextAus}>Aus: {totalAus}</span>
			</div>
		</div>
	);
}

export default Card;
