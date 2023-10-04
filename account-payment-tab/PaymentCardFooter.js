import React from 'react';
import Image from 'next/image';
import { Stack, List, ListItem, Divider } from '@mui/material';

export default function PaymentsCardFooter() {
	const icons = [
		'visa',
		'mastercard',
		'discover',
		'americanexpress',
		'emblem',
		'unionpay',
	];
	return (
		<Stack sx={{ pt: 4, maxWidth: '100%' }}>
			<Stack
				direction="row"
				justifyContent="space-between"
				alignItems="center">
				<Image
					alt=""
					width={160}
					height={16}
					src="/payments/safe-secure-payments.svg"
				/>
				<Image
					alt=""
					width={80}
					height={16}
					src="/payments/powered_by_stripe.svg"
				/>
			</Stack>
			<Divider sx={{ my: 1 }} />
			<List sx={{ display: 'flex', justifyContent: 'space-between' }}>
				{icons.map((icon, index) => (
					<ListItem key={index} sx={{ p: 0 }}>
						<Image
							alt=""
							width={40}
							height={16}
							src={`/payments/${icon}.svg`}
						/>
					</ListItem>
				))}
			</List>
		</Stack>
	);
}
