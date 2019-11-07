import Link from 'next/link';
import React from 'react';
import styles from './Card.css';

function Card({ slug, title, totalAbst, totalAus, totalSi, totalNo }) {
	return (
		<div className={styles.cardItem}>
			<Link href={`/polls/${slug}`} prefetch={false}>
				<a className={styles.cardTitle}>{title}</a>
			</Link>
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
