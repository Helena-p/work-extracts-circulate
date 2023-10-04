import { FormattedMessage } from 'react-intl';
import { useRouter } from 'next/router';
import { Stack, Box, Typography, List, ListItem } from '@mui/material';
import { filterVariants, groupVariants } from '../../functions/shop/filters.js';

export default function NullResult({ filterData }) {
	const router = useRouter();
	const query = router.query;

	let searchListText = [
		['search', 'Keywords'],
		['category', 'Categories'],
		['material_type', 'Color'],
		['size', 'Size'],
		['delivery_time', 'Delivery'],
		['sustainability_labels', 'Sustainability'],
		['moq', 'MinimumQty'],
		['suitable_for', 'SuitableFor'],
		['vendor', 'Vendor'],
	].filter(([queryKey, _]) => Object.keys(query).includes(queryKey));

	let searchItems = searchListText.map(
		([excludedFilter, excludeFilterNameId]) =>
			// Don't show results with zero products
			groupVariants(filterVariants(filterData, [excludedFilter])).length >
			0 ? (
				// Show results
				<ListItem sx={{ display: 'block', p: 0 }} key={excludedFilter}>
					<FormattedMessage
						id="Page.NullResult.SearchItems.Text"
						values={{
							b: (chunks) => <b>{chunks}</b>,
							filter: (
								<FormattedMessage
									id={`Filters.Label.${excludeFilterNameId}`}
								/>
							),
							num: groupVariants(
								filterVariants(filterData, [excludedFilter])
							).length,
						}}
					/>
				</ListItem>
			) : null
	);

	return (
		<>
			<Stack sx={{ width: '100%', px: 2, py: 2 }}>
				<Typography variant="h1" component="h2">
					<FormattedMessage id="Page.NullResult.Title" />
				</Typography>
				<Box sx={{ py: 4 }}>
					<Typography
						variant="h4"
						component="h3"
						sx={{ pb: 1, mb: 0 }}>
						<FormattedMessage id="Page.NullResult.Copy" />
					</Typography>
					<List
						sx={{
							p: 0,
							listStyleType: '-moz-initial',
							listStyleType: 'initial',
						}}>
						{filterData?.freeTextFilter && (
							<ListItem sx={{ p: 0 }}>
								<FormattedMessage id="Page.NullResult.SearchItems.CheckSpelling" />
							</ListItem>
						)}

						{searchItems}
					</List>
				</Box>
			</Stack>
		</>
	);
}
