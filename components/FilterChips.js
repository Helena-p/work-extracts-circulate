import React from 'react';
import { useIntl } from 'react-intl';
import { Stack, Chip, Divider } from '@mui/material';

import { useRouter } from 'next/router';
import {
	setCategoryFilterParam,
	setMaterialColorFilterParam,
	setMaterialTypeFilterParam,
	setSizeFilterParam,
	setShapeFilterParam,
	setFreeTextFilterParam,
	setSustainabilityLabelsFilterParam,
	setMoqFilterParam,
	setDeliveryTimeParam,
	setSuitableForFilterParam,
	setVendorFilterParam,
	setSortOptionParam,
} from '../../functions/shop/updateParams';

export default function FilterChips({ filterData }) {
	const router = useRouter();
	const { formatMessage } = useIntl();

	let {
		categories,
		categoryFilter,
		materialColorFilter,
		materialTypeFilter,
		suitableForFilter,
		sizeFilter,
		shapeFilter,
		sustainabilityLabelsFilter,
		moqFilter,
		deliveryTimeFilter,
		vendorFilter,
		freeTextFilter,
		textFilterRef,
	} = filterData;

	const styles = {
		fontFamily: 'Kantumruy Pro',
		fontSize: '0.875rem',
		m: 0.5,
		backgroundColor: 'grey.200',
	};
	// Group filter with the same num of parameters
	const filters = [
		{
			filter: suitableForFilter,
			param: setSuitableForFilterParam,
			id: 'Filters.Label.SuitableFor',
		},
		{
			filter: materialColorFilter,
			param: setMaterialColorFilterParam,
			id: 'Filters.Label.Color',
		},
		{
			filter: materialTypeFilter,
			param: setMaterialTypeFilterParam,
			id: 'Filters.Label.Material',
		},
		{
			filter: sustainabilityLabelsFilter,
			param: setSustainabilityLabelsFilterParam,
			id: 'Filters.Label.Sustainability',
		},
		{
			filter: vendorFilter,
			param: setVendorFilterParam,
			id: 'Filters.Label.Vendor',
		},
		{
			filter: sizeFilter,
			param: setSizeFilterParam,
			id: 'Filters.Label.Size',
		},
		{
			filter: shapeFilter,
			param: setShapeFilterParam,
			id: 'Filters.Label.Shape',
		},
	];

	let removeCategory = (valueToRemove) => {
		setCategoryFilterParam(
			categoryFilter.filter((value) => value != valueToRemove),
			router,
			categories
		);
	};
	let removeTextFilter = (valueToRemove, setFilterToRemove) => {
		setFilterToRemove((value) => value != valueToRemove, router);
	};

	let removeFilter = (valueToRemove, setFilterToRemove, productFilter) => {
		setFilterToRemove(
			productFilter.filter((value) => value != valueToRemove),
			router
		);
	};

	return (
		<Stack
			direction="row"
			alignItems="center"
			sx={{
				flexWrap: { xs: 'nowrap', md: 'wrap' },
				overflowX: 'scroll',
				p: 0,
				pb: { xs: 1.5, md: 0 },
				mb: { xs: 1, md: 0 },
			}}>
			{categoryFilter.map((category_id) => (
				<Chip
					data-testid="category-chip"
					sx={styles}
					key={category_id}
					label={`${formatMessage({
						id: 'Filters.Label.Categories',
					})}: ${categories.indexId[category_id].name}`}
					onDelete={() => removeCategory(category_id)}
				/>
			))}

			{filters.map((item) =>
				item.filter.map((value) => (
					<Chip
						sx={styles}
						key={value}
						label={`${formatMessage({
							id: item.id,
						})}: ${value}`}
						onDelete={() =>
							removeFilter(value, item.param, item.filter)
						}
					/>
				))
			)}

			{deliveryTimeFilter.length && (
				<Chip
					sx={styles}
					key={deliveryTimeFilter}
					label={`${formatMessage({
						id: 'Wizard.Label.DeliveryTime',
					})}: ${
						deliveryTimeFilter == 0
							? formatMessage({
									id: 'Filters.Label.Delivery.NoLimit',
							  })
							: formatMessage(
									{
										id: 'Filters.Label.Delivery.Time',
									},
									{ value: deliveryTimeFilter }
							  )
					}`}
					onDelete={() =>
						removeTextFilter(
							deliveryTimeFilter,
							setDeliveryTimeParam
						)
					}
				/>
			)}
			{moqFilter && (
				<Chip
					sx={styles}
					key={moqFilter}
					label={`${formatMessage({
						id: 'Product.QuantitySelector.Label',
					})}: ${
						moqFilter === 'samples'
							? formatMessage({ id: 'Filters.Moq.Samples' })
							: moqFilter === 'nolimit'
							? formatMessage({ id: 'Filters.Moq.NoLimit' })
							: formatMessage(
									{
										id: 'Filters.Moq',
									},
									{ value: moqFilter }
							  )
					}`}
					onDelete={() =>
						removeTextFilter(moqFilter, setMoqFilterParam)
					}
				/>
			)}

			{freeTextFilter && (
				<Chip
					sx={styles}
					key={freeTextFilter}
					label={`${formatMessage({
						id: 'Filters.Label.Keywords',
					})}: ${freeTextFilter}`}
					onDelete={() =>
						removeTextFilter(freeTextFilter, setFreeTextFilterParam)
					}
				/>
			)}
		</Stack>
	);
}
