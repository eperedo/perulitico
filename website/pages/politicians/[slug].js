import { useEffect, useState } from 'react';
import Link from 'next/link';
import useSWR, { useSWRPages } from 'swr';
import TheHeader from './../../components/TheHeader';
import BaseButton from './../../components/base/BaseButton';
import styles from './PoliticiansDetails.css';
import { getEvents, getPoliticianBySlug } from './../api/polls';

function PoliticianDetails({ politician }) {
	const [page, setPage] = useState(0);
	const { pages, isLoadingMore, isReachingEnd, loadMore } = useSWRPages(
		'demo-page',
		({ offset, withSWR }) => {
			const newOffset = offset || 0;
			const { data: events } = withSWR(
				useSWR(
					`/politicians/${
						politician.slug
					}/1/events?from=${newOffset}&to=${newOffset + 19}`,
					() => getEvents(politician.slug, newOffset, newOffset + 19),
				),
			);

			if (!events) {
				return <p>Loading</p>;
			}

			return events.map((event) => {
				return (
					<div key={event.webSlug} className={styles.eventItem}>
						<p>{event.description}</p>
						<div className={styles.eventDate}>
							<span>{event.eventDate}</span>
							<Link href={`/polls/${event.webSlug}`} prefetch={false}>
								<a>Ver detalle</a>
							</Link>
						</div>
					</div>
				);
			});
		},
		() => page + 20,
		[],
	);

	function loadMoreData() {
		setPage((prev) => prev + 20);
		loadMore();
	}

	return (
		<section>
			<TheHeader />
			<section className={styles.profileContainer}>
				<section className={styles.leftSection}>
					<div className={styles.politicianProfile}>
						<img
							alt={politician.fullName}
							width="120"
							height="120"
							src={politician.avatar || '/default-avatar.png'}
						/>
						{politician.alias && <p>"{politician.alias}"</p>}
					</div>
				</section>
				<section id="right-section">
					<header className={styles.containerTitle}>
						<h1>{politician.fullName}</h1>
					</header>
					<section>
						<div>
							<select>
								<option>Votaciones</option>
							</select>
						</div>
						<section className={styles.containerEvents}>
							{pages}
							<BaseButton dataProps={{ onClick: loadMoreData, type: 'button' }}>
								Ver mas
							</BaseButton>
						</section>
					</section>
				</section>
			</section>
		</section>
	);
}

async function getInitialProps({ query }) {
	const { slug } = query;
	const data = await getPoliticianBySlug(slug);
	return { politician: data };
}

PoliticianDetails.getInitialProps = getInitialProps;

export default PoliticianDetails;
