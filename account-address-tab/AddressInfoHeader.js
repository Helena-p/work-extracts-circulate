import {
	useState,
	useEffect,
	useContext,
	useRef,
	forwardRef,
	useImperativeHandle,
} from 'react';
import { Stack, Box, Button, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FormattedMessage } from 'react-intl';

export default function AddressInfoHeader({ currentView, onClick, onGoBack }) {
	function switchHeader(param) {
		switch (param) {
			case 'new':
				return <FormattedMessage id="Generic.NewAddress" />;
			case 'edit':
				return <FormattedMessage id="Generic.EditAddress" />;
			default:
				return <FormattedMessage id="Generic.SavedAddresses" />;
		}
	}

	return (
		<Stack
			direction="row"
			justifyContent="space-between"
			flexWrap="wrap"
			sx={{ gap: 2 }}>
			<Stack alignItems="flex-start">
				{currentView === 'new' || currentView === 'edit' ? (
					<Button
						onClick={onGoBack}
						sx={{ pl: 0, pb: 1, justifyContent: 'flex-start' }}>
						<ArrowBackIcon />
					</Button>
				) : null}
				<Typography
					variant="h3"
					component="h2"
					sx={{
						flexGrow: 1,
						flexBasis: 'max-content',
						whiteSpace: 'nowrap',
						py: 1,
					}}>
					{switchHeader(currentView)}
				</Typography>
				{currentView === 'saved' && (
					<Typography variant="body2">
						<FormattedMessage id="BuyerAccount.Copy.UpdateAccountDetails" />
					</Typography>
				)}
				{currentView === 'new' || currentView === 'edit' ? (
					<Typography variant="body2" sx={{ mb: 4 }}>
						<FormattedMessage id="Generic.Required" />
					</Typography>
				) : null}
			</Stack>
			{currentView === 'saved' && (
				<Button
					onClick={onClick}
					variant="outlined"
					sx={{
						whiteSpace: 'nowrap',
						padding: '4px 16px',
						height: 'fit-content',
					}}>
					<FormattedMessage id="AccountTab.AddNewAddress" />
				</Button>
			)}
		</Stack>
	);
}
