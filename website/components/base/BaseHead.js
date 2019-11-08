import Head from 'next/head';

const SITE_DOMAIN = process.env.SITE_DOMAIN;
const DEFAULT_DESCRIPTION =
	'Descubre qué hacen lxs políticxs cuando son o fueron funcionarixs públicxs.';

function BaseHead({ description = DEFAULT_DESCRIPTION, title, url = '' }) {
	return (
		<Head>
			<title>{`${title} - Perulítico`}</title>
			<meta charset="utf-8" />
			<meta name="description" content={description} />
			<meta name="robots" content="index, follow" />
			<meta name="author" content="RiverZero" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />

			{/* twitter cards */}
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@perulitico" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />

			{/* facebook open graph */}
			<meta property="og:type" content="article" />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content="perulitico" />
			<meta property="og:url" content={`${SITE_DOMAIN}/${url}`} />
			<meta property="og:image" content={`${SITE_DOMAIN}/default-avatar.png`} />
			<meta property="article:author" content="RiverZero" />
		</Head>
	);
}

export default BaseHead;
