import React from 'react';
import styles from './Card.css';

function Card({ title, totalAbst, totalAus, totalSi, totalNo }) {
	return (
		<div className={styles.cardItem}>
			<p className={styles.cardTitle}>{title}</p>
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
