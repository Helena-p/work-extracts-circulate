import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Breadcrumbs, Grid, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { capitalizeFirstLetter } from '../../backend/datasets/variants';
import Crumb from './Crumb';

export default function Breadcrumb({
	subCategory,
	variant,
	bgColor = 'transparent',
	gridSx = {},
}) {
	const { formatMessage } = useIntl();
	const router = useRouter();

	// Category in query can be either a value or an array - here we ensure that it is always an array to avoid mismatch in the code later on
	let queryCategoriesAsArray = router?.query?.category
		? Array.isArray(router.query.category)
			? router.query.category
			: [router.query.category]
		: [];

	function generateBreadcrumbs() {
		// remove query and hash-links in path
		const asPathWithoutQuery = router.asPath.split(/\?|#/)[0];

		// array from nested route paths
		const asPathNestedRoutes = asPathWithoutQuery
			.split('/')
			.filter((v) => v.length > 0);
		// remove parent folder from path if empty
		if (
			asPathNestedRoutes[0] === 'buyer' ||
			asPathNestedRoutes[0] === 'other'
		) {
			asPathNestedRoutes.shift();
		}
		// remove custom folder from path
		if (
			asPathNestedRoutes[0] === 'products' &&
			asPathNestedRoutes[1] === 'custom'
		) {
			asPathNestedRoutes.splice(1, 1);
		}

		// generate list of crumbs from nested routes
		let crumblist = asPathNestedRoutes.map((subpath, index) => {
			// For sentence case
			const path = capitalizeFirstLetter(subpath);
			// join together the path parts
			const href = '/' + asPathNestedRoutes.slice(0, index + 1).join('/');
			const text = path.replaceAll('-', ' ');
			return { href, text };
		});

		// show 'all products' instead of 'shop'
		if (
			router.asPath.includes('/shop') ||
			router.asPath.includes('/products')
		) {
			crumblist[0] = {
				href: '/shop',
				text: formatMessage({ id: 'Page.Label.Shop' }),
			};
		}

		// Show breadcrumbs with categories only if exactly one category is checked
		if (queryCategoriesAsArray.length === 1 && !variant) {
			let category = queryCategoriesAsArray[0];
			if (subCategory) {
				crumblist[1] = {
					href: `/shop?category=${subCategory}`,
					text: capitalizeFirstLetter(subCategory).replace('-', ' '),
				};
				crumblist[2] = {
					href: `/shop?category=${category}`,
					text: capitalizeFirstLetter(category).replace('-', ' '),
				};
			} else {
				crumblist[1] = {
					href: `/shop?category=${category}`,
					text: capitalizeFirstLetter(category).replace('-', ' '),
				};
			}
		}

		// show category for variant instead of 'all products'
		if (variant) {
			if (variant.categories?.length && variant.categories[0] !== null) {
				crumblist[1] = {
					href: `/shop?category=${variant.categories[0].slug}`,
					// For sentence case
					text: capitalizeFirstLetter(variant.categories[0].name),
				};
				// show variants leaf parent category if it exist
				if (variant.categories[1] !== null) {
					crumblist[2] = {
						href: `/shop?category=${variant.categories[1].slug}`,
						text: variant.categories[1].name,
					};
					crumblist[3] = {
						// For sentence case
						text: capitalizeFirstLetter(variant.name),
					};
				} else {
					crumblist[2] = {
						// For sentence case
						text: capitalizeFirstLetter(variant.name),
					};
				}
			} else {
				crumblist[1] = {
					// For sentence case
					text: capitalizeFirstLetter(variant.name),
				};
			}
		}

		// Add in a default "home" crumb if other crumbs exist
		// If we are on home page, do not add "home" crumb, we will instead show an empty breadcrumb creating some distance to the hero
		if (crumblist.length) {
			crumblist = [
				{ href: '/', text: formatMessage({ id: 'Generic.Home' }) },
				...crumblist,
			];
		}

		return crumblist;
	}
	const breadcrumbs = generateBreadcrumbs();

	return (
		<Box
			className="breadcrumb-wrapper"
			sx={{
				backgroundColor: bgColor,
				position: { mobile: 'static', laptop: 'sticky' },
			}}>
			<Grid
				container
				maxWidth="96.25rem"
				sx={{
					mx: 'auto',
					pr: { xs: 0, sm: 0, md: 4, lg: 4 },
					pl: { xs: 2, sm: 6, md: 6, lg: 6 },
					...gridSx,
				}}>
				<Grid item xs={12} role="presentation">
					<Breadcrumbs
						aria-label="breadcrumb"
						separator={
							<NavigateNextIcon fontSize="12px" color="primary" />
						}>
						{breadcrumbs.map((crumb, index) => (
							<Crumb
								{...crumb}
								key={crumb.text}
								last={
									index == breadcrumbs.length - 1
										? true
										: false
								}
							/>
						))}
					</Breadcrumbs>
				</Grid>
			</Grid>
		</Box>
	);
}
