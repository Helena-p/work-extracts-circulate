import React from 'react';
import { useContext } from 'react';
import {
	Stack,
	Typography,
	Card,
	CardContent,
	IconButton,
	Divider,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { FormattedMessage } from 'react-intl';

import { CirculateContext } from '../../context/CirculateContextWrapper';
import countries from '../../../static/storeCountries.json';
import { capitalizeFirstLetter } from '../../../functions/products/variants';

export default function AddressCard({ address, onEdit, onDelete }) {
	let {
		id,
		country,
		description,
		type,
		first_name,
		last_name,
		address1,
		address2,
		zip,
		state,
		city,
		note,
	} = address;

	let filteredCountry = countries.find(
		(code) => code.countryCode === country
	);
	let { account, refreshAccount } = useContext(CirculateContext);

	let isDefaultShipping = account?.shipping?.account_address_id == id;
	let isDefaultBilling = account?.billing?.account_address_id == id;

	return (
		<Card
			sx={{
				minWidth: 340,
				maxWidth: 'max-content',
				boxShadow: '0px 4px 8px rgba(144, 171, 169, 0.2)',
				borderRadius: '4px',
			}}>
			<Stack
				direction="row"
				alignItems="center"
				flexWrap="wrap"
				justifyContent="space-between">
				<Typography
					variant="h5"
					component="h3"
					sx={{ flexGrow: 1, flexBasis: 'max-content', p: 2 }}>
					{description && capitalizeFirstLetter(description)}
				</Typography>

				<IconButton
					aria-label="Delete"
					size="small"
					onClick={onDelete}
					color="error"
					sx={{ p: 1.5 }}>
					<DeleteOutlineIcon sx={{ fontSize: '24px' }} />
				</IconButton>
				<Divider orientation="vertical" variant="middle" flexItem />
				<IconButton
					aria-label="Edit"
					size="small"
					onClick={onEdit}
					fontSize="inherit"
					sx={{ p: 1.5 }}>
					<EditIcon color="primary" sx={{ fontSize: '24px' }} />
				</IconButton>
			</Stack>
			<Divider sx={{ mx: 2 }} />
			<CardContent sx={{ minHeight: '100px', overflowX: 'scroll' }}>
				<Stack>
					{first_name || last_name ? (
						<Typography variant="body2" color="text.secondary">
							{first_name} {last_name}
						</Typography>
					) : null}
					<Typography variant="body2" color="text.secondary">
						{address1}
					</Typography>
					{address2 && (
						<Typography variant="body2" color="text.secondary">
							{address2}
						</Typography>
					)}
					<Typography variant="body2" color="text.secondary">
						{zip}, {city}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						{state && state} {filteredCountry?.country}
					</Typography>
					<Typography
						sx={{ mt: 1, maxWidth: '30ch', fontSize: '0.8rem' }}
						color="text.secondary">
						{note && note}
					</Typography>
				</Stack>
			</CardContent>
			<Divider sx={{ mx: 2 }} />
			<CardContent>
				<Stack
					sx={{
						flexDirection: 'row',
						justifyContent: 'space-between',
					}}>
					{isDefaultShipping && (
						<Typography
							sx={{
								maxWidth: '30ch',
								fontSize: '0.7rem',
								fontStyle: 'italic',
							}}
							color="text.secondary">
							<FormattedMessage id="AddressCard.IsDefaultShipping" />
						</Typography>
					)}
					{isDefaultBilling && (
						<Typography
							sx={{
								maxWidth: '30ch',
								fontSize: '0.7rem',
								fontStyle: 'italic',
							}}
							color="text.secondary">
							<FormattedMessage id="AddressCard.IsDefaultBilling" />
						</Typography>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
}
