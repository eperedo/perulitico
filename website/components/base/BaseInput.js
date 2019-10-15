import React from 'react';
import styles from './BaseInput.css';

function BaseInput({ children, inputProps, labelProps }) {
	return (
		<div className={styles.container}>
			<label className={styles.label} {...labelProps}>
				{children}
			</label>
			<input className={styles.input} {...inputProps} />
		</div>
	);
}

export default BaseInput;
