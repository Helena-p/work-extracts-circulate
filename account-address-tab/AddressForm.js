import { useState, useEffect, useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
	MenuItem,
	Grid,
	Stack,
	TextField,
	Typography,
	FormGroup,
	FormControlLabel,
	Checkbox,
	ClickAwayListener,
} from '@mui/material';
import countries from '../../../static/storeCountries.json';
import { accountFormData } from '../../../functions/account/AccountFormData';
import { CirculateContext } from '../../context/CirculateContextWrapper';
import FormActionButtons from '../FormActionButtons';
import DialogModal from '../../dialogs/Dialog';

export default function AddressForm({
	onSubmit,
	disabled,
	addressState,
	handleInputValue,
	onClear,
}) {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [changeEvent, setChangeEvent] = useState(false);
	const [clickedAway, setClickedAway] = useState(false);
	const [error, setError] = useState(false);
	const { setIsLoading } = useContext(CirculateContext);
	const { formatMessage } = useIntl();

	const handleClickAway = (e) => {
		if (changeEvent && addressState.isValid) {
			setClickedAway(true);
			setDialogOpen(true);
		}
		setClickedAway(false);
	};

	const closeDialog = () => {
		setDialogOpen(false);
		setClickedAway(false);
		setChangeEvent(false);
	};

	const dialogButtonStyles = {
		closeStyles: {
			textDecoration: 'none',
			textUnderlineOffset: 0,
			color: 'error.main',
			borderColor: 'error.main',
			'&:hover': {
				backgroundColor: 'rgb(198,40,40, 0.08)',
				borderColor: 'error.dark',
			},
		},
		confirmStyles: {
			textDecoration: 'none',
			textUnderlineOffset: 0,
		},
	};

	return (
		<>
			<ClickAwayListener onClickAway={handleClickAway}>
				<Stack onChange={(e) => setChangeEvent(true)}>
					<Grid
						container
						component="form"
						id="address-form"
						spacing={2}
						sx={{ maxWidth: 800 }}
						onSubmit={onSubmit}>
						<Grid item xs={12} sm={6} sx={{ px: 2, py: 3 }}>
							<TextField
								aria-live="polite"
								aria-atomic="true"
								fullWidth
								id="address-description"
								name="description"
								label="Address title"
								variant="standard"
								type="text"
								value={addressState.description ?? ''}
								onChange={handleInputValue}
							/>
						</Grid>
						<Grid
							item
							fullwidth="true"
							xs={12}
							sm={6}
							id="spacer"></Grid>

						{accountFormData.map((address) => (
							<Grid key={address.id} item xs={12} sm={6}>
								<TextField
									aria-live="polite"
									aria-atomic="true"
									fullWidth
									type="text"
									required={address.required}
									id={address.id}
									name={address.name}
									label={formatMessage({
										id: address.headline,
									})}
									value={addressState[address.name] ?? ''}
									onChange={handleInputValue}
									error={address.required && error}
								/>
							</Grid>
						))}
						<Grid item xs={12} sm={6}>
							<TextField
								required
								fullWidth
								type="text"
								value={addressState.country ?? ''}
								name="country"
								onChange={handleInputValue}
								select
								label={formatMessage({
									id: 'Generic.Country',
								})}>
								{countries.map((country) => (
									<MenuItem
										key={country.countryCode}
										value={country.countryCode}>
										{country.country}
									</MenuItem>
								))}
							</TextField>
						</Grid>

						<Grid item xs={12} sm={6} id="spacer"></Grid>

						<Grid item xs={12} sm={12} sx={{ my: 1, mx: 0 }}>
							<TextField
								sx={{ width: '100%' }}
								aria-live="polite"
								aria-atomic="true"
								id="address-notes"
								name="note"
								type="text"
								label="Address notes"
								value={addressState.note ?? ''}
								onChange={handleInputValue}
								multiline
								minRows={3}
								maxRows={20}
							/>
						</Grid>

						<Grid item xs={12} sx={{ my: 3, mx: 2 }}>
							<FormGroup>
								<FormControlLabel
									control={
										<Checkbox
											name="billing"
											checked={addressState.billing}
											onChange={handleInputValue}
										/>
									}
									label="Set as default billing address"
								/>
								<FormControlLabel
									control={
										<Checkbox
											name="shipping"
											checked={addressState.shipping}
											onChange={handleInputValue}
										/>
									}
									label="Set as default shipping address"
								/>
							</FormGroup>
						</Grid>
						<Grid item xs={12}>
							<FormActionButtons
								onClear={onClear}
								formId="address-form"
								disabled={disabled}
							/>
						</Grid>
					</Grid>
				</Stack>
			</ClickAwayListener>
			<DialogModal
				open={dialogOpen}
				handleClose={closeDialog}
				title={<FormattedMessage id="Dashboard.Modal.Title" />}
				onCancel={closeDialog}
				onCancelText={<FormattedMessage id="Generic.Cancel" />}
				onClose={closeDialog}
				closeVariant="outlined"
				confirmVariant="contained"
				onCloseText={<FormattedMessage id="Generic.DontSave" />}
				onConfirmText={<FormattedMessage id="Generic.SaveContinue" />}
				buttonStyles={dialogButtonStyles}
				form="address-form"
				submit={true}
			/>
		</>
	);
}
