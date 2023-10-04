import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useState, useContext, useEffect } from 'react';
import {
	Paper,
	Stack,
	Box,
	FormControl,
	Grid,
	Typography,
	ClickAwayListener,
} from '@mui/material';
import Link from 'next/link';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';
import DialogModal from '../../dialogs/Dialog';
import { contactFormdata } from '../../../functions/account/accountFormData';
import AccountLoginPrompt from '../AccountLoginPrompt';
import { useFormControls } from '../../../functions/signup/formControls';
import { updateAccount } from '../../../backend/backend';

import { CirculateContext } from '../../context/CirculateContextWrapper';
import InputField from '../../layout/InputField';
import FormActionButtons from '../FormActionButtons';

export default function CompanyInfoTab({ styles }) {
	const { formatMessage } = useIntl();
	const [isOpen, setIsOpen] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [changeEvent, setChangeEvent] = useState(false);
	const [clickedAway, setClickedAway] = useState(false);
	const { account, refreshAccount, isLoggedIn, isLoading, setIsLoading } =
		useContext(CirculateContext);
	let [phoneNumber, setPhoneNumber] = useState(null);
	const {
		handleInputValue,
		updateAccountIsValid,
		errors,
		values,
		setValues,
	} = useFormControls();

	const clearForm = (e) => {
		setValues({
			email: '',
			firstName: '',
			lastName: '',
			companyName: '',
			vat: '',
		});
		setPhoneNumber(null);
	};

	const setNewAccountDetails = async () => {
		setClickedAway(false);
		closeDialog();
		setIsLoading(true);
		if (!updateAccountIsValid() || phoneNumber === null) return;
		try {
			await updateAccount({
				first_name: values.firstName,
				last_name: values.lastName,
				name: values.companyName,
				email: values.email,
				vat_number: values.vat,
				phone: phoneNumber,
				type: 'business',
			});

			await refreshAccount();
			setIsOpen(true);
			setIsLoading(false);
		} catch (error) {
			console.warn(error.message);
		} finally {
			setIsLoading(false);
		}
	};

	// Load user data into the form
	useEffect(() => {
		if (account) {
			setValues({
				email: account.email || '',
				firstName: account.first_name || '',
				lastName: account.last_name || '',
				companyName: account.name || '',
				vat: account.vat_number || '',
			});
			setPhoneNumber(account.phone);
		}
	}, [account, setValues, setPhoneNumber]);

	const handleClickAway = (e) => {
		if (changeEvent && updateAccountIsValid) {
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
				<Paper elevation={1} sx={{ p: 3 }}>
					<Typography variant="h3" component="h2" sx={{ pb: 1 }}>
						<FormattedMessage id="Generic.CompanyDetails" />
					</Typography>
					{isLoggedIn() ? (
						<Typography variant="body2" sx={{ mb: 4 }}>
							<FormattedMessage id="Generic.AllFieldsRequired" />
						</Typography>
					) : null}
					<Grid
						item
						xs={12}
						sm={12}
						md={10}
						sx={{
							minHeight: '31.25rem',
							pt: 0,
						}}>
						{isLoggedIn() ? (
							<>
								<Collapse
									in={isOpen}
									sx={{
										position: 'absolute',
										top: '8%',
										right: '10%',
									}}>
									<Alert
										action={
											<IconButton
												aria-label="close"
												color="inherit"
												size="small"
												onClick={() => {
													setIsOpen(false);
												}}>
												<CloseIcon fontSize="inherit" />
											</IconButton>
										}
										severity="success">
										<AlertTitle>
											<FormattedMessage id="Alert.Success" />
										</AlertTitle>
										<FormattedMessage id="Alert.Success.AccountDetails" />
									</Alert>
								</Collapse>

								<FormControl
									fullwidth="true"
									component="form"
									id="form"
									onSubmit={(e) => {
										setNewAccountDetails(e);
										e.preventDefault();
									}}
									onChange={(e) => setChangeEvent(true)}>
									<Grid container spacing={3} py={2}>
										{contactFormdata.map((input) => (
											<Grid
												item
												xs={12}
												sm={6}
												key={input.id}
												sx={{ maxWidth: '100%' }}>
												<InputField
													{...input}
													wide={true}
													name={input.name}
													value={values[input.name]}
													onChange={handleInputValue}
													{...(errors[input.name] && {
														error: true,
													})}
												/>
												<span
													id={
														input.id ===
														'account-email'
															? 'email__show-error'
															: ''
													}
													className={
														errors
															? 'show-error'
															: 'hide'
													}>
													{errors[input.name]}
												</span>
											</Grid>
										))}
										<Grid item xs={12} sm={6}>
											<PhoneInput
												country="se"
												value={phoneNumber}
												onChange={(phone) =>
													setPhoneNumber(phone)
												}
												preferredCountries={[
													'at',
													'be',
													'ch',
													'cy',
													'cz',
													'de',
													'dk',
													'es',
													'fi',
													'fr',
													'gb',
													'gr',
													'hu',
													'ie',
													'is',
													'it',
													'lv',
													'lu',
													'mt',
													'nl',
													'no',
													'pl',
													'pt',
													'ro',
													'se',
													'si',
													'sk',
												]}
												inputStyle={{
													padding:
														'16.5px 14px 16.5px 50px',
												}}
												sx={{ width: '100%' }}
												specialLabel={
													formatMessage({
														id: 'Generic.Phone',
													}) + ' *'
												}
											/>
											<Typography
												role="log"
												aria-live="polite"
												aria-atomic="true"
												sx={{
													color: 'error.main',
													visibility: phoneNumber
														? 'hidden'
														: 'visible',
												}}>
												<FormattedMessage id="Generic.PhoneErrorMessage" />
											</Typography>
										</Grid>
									</Grid>
									<Box sx={{ maxWidth: '60ch' }}>
										<Typography variant="body2">
											<FormattedMessage
												id="AccountTab.PrivacyText"
												values={{
													b: (chunks) => (
														<span
															style={{
																color: '#006E66',
																textDecoration:
																	'underline',
															}}>
															{chunks}
														</span>
													),
													link: (
														<Link href="/other/privacy-policy">
															<FormattedMessage id="Page.Label.PrivacyPolicy" />
														</Link>
													),
												}}
											/>
										</Typography>
									</Box>
									<FormActionButtons
										onClear={clearForm}
										disabled={!updateAccountIsValid()}
									/>
								</FormControl>
								<Stack pt={8} pb={2}>
									<Typography variant="h6" component="h3">
										<FormattedMessage id="AccountTab.DeleteAccount.Title" />
									</Typography>
									<Typography
										variant="caption"
										sx={{
											width: '100%',
											maxWidth: '70ch',
											pt: 1,
										}}>
										<FormattedMessage
											id="AccountTab.DeleteAccount.Text"
											values={{
												b: (chunks) => (
													<span
														style={{
															color: '#006E66',
														}}>
														{chunks}
													</span>
												),
												link: (
													<Link href="mailto:info@circulate8.com">
														<FormattedMessage id="Generic.CirculateEmail" />
													</Link>
												),
												phone: (
													<Link href="tel:+46728377580">
														<FormattedMessage id="Generic.PhoneInDigits" />
													</Link>
												),
											}}
										/>
									</Typography>
								</Stack>
							</>
						) : (
							<AccountLoginPrompt
								value={
									<FormattedMessage id="Generic.CompanyDetails" />
								}
							/>
						)}
					</Grid>
				</Paper>
			</ClickAwayListener>
			<DialogModal
				open={dialogOpen}
				handleClose={closeDialog}
				title={<FormattedMessage id="Dashboard.Modal.Title" />}
				onCancel={closeDialog}
				onCancelText={<FormattedMessage id="Generic.Cancel" />}
				onClose={closeDialog}
				closeVariant="outlined"
				onConfirm={setNewAccountDetails}
				confirmVariant="contained"
				onCloseText={<FormattedMessage id="Generic.DontSave" />}
				onConfirmText={<FormattedMessage id="Generic.SaveContinue" />}
				buttonStyles={dialogButtonStyles}
			/>
		</>
	);
}
