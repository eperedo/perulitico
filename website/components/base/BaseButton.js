import React from 'react';
import styles from './BaseButton.css';

function BaseButton({ children }) {
	return <button className={styles.button}>{children}</button>;
}

export default BaseButton;
