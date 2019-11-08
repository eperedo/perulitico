import Link from 'next/link';
import useSWR from 'swr';
import TheHeader from './../../components/TheHeader';
import { getPoliticians } from '../api/polls';
import styles from './PoliticiansPage.css';
import BaseHead from '../../components/base/BaseHead';

function PoliticiansPage() {
	const { data } = useSWR('politicians', getPoliticians);

	return (
		<section>
			<BaseHead title="Listado de Politicos" url="/politicians" />
			<TheHeader />
			{data && (
				<section className={styles.politiciansList}>
					{data.map((politician) => {
						return (
							<div className={styles.politiciansItem} key={politician.slug}>
								<div>
									<img
										alt={politician.fullName}
										src={politician.avatar || '/default-avatar.png'}
										width="120"
										height="120"
									/>
								</div>
								<p>
									<Link
										href={`/politicians/${politician.slug}`}
										prefetch={false}
									>
										<a>{politician.fullName}</a>
									</Link>
								</p>
							</div>
						);
					})}
				</section>
			)}
		</section>
	);
}

export default PoliticiansPage;
