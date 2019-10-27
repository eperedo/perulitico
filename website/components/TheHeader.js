import Link from 'next/link';
import styles from './TheHeader.css';

function TheHeader({ bgColor }) {
	return (
		<ul
			className={styles.containerMenu}
			style={{
				backgroundColor: bgColor || '#bdbdbd',
			}}
		>
			<li>
				<Link href="/">
					<a>Inicio</a>
				</Link>
			</li>
		</ul>
	);
}

export default TheHeader;
