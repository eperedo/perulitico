import React from 'react';
import styles from './BaseButton.css';

function BaseButton({ children, dataProps }) {
	return (
		<button {...dataProps} className={styles.button}>
			{children}
		</button>
	);
}

export default BaseButton;
