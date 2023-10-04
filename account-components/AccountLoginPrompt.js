import React from 'react';
import { Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';

export default function AccountLoginPrompt({ value }) {
	return (
		<Grid container sx={{ placeContent: 'center', minHeight: '42.25rem' }}>
			<Typography>
				<FormattedMessage
					id="BuyerAccount.Subtitle.LogInPrompt"
					values={{
						b: (chunks) => (
							<span style={{ textTransform: 'lowercase' }}>
								{chunks}
							</span>
						),
						value: value,
					}}
				/>
			</Typography>
		</Grid>
	);
}
