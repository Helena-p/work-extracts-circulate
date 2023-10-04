import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useState, useContext, useEffect } from 'react';
import {
	Container,
	Box,
	FormControl,
	Grid,
	Button,
	Typography,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage, useIntl } from 'react-intl';

import AccountSidePanel from '../../../../components/menu/AccountSidePanel';
import { accountFormData } from '../../../../functions/account/accountFormData';
import { useFormControls } from '../../../../functions/signup/formControls';
import { updateAccount } from '../../../../backend/backend';

import { CirculateContext } from '../../../../components/context/CirculateContextWrapper';
import InputField from '../../../../components/layout/InputField';
import Breadcrumb from '../../../../components/generic/Breadcrumb';

export default function UpdateAccountPage() {
	const { formatMessage } = useIntl();
	const [isOpen, setIsOpen] = useState(false);
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
		document.getElementById('form').reset();
	};

	const setNewAccountDetails = async () => {
		setIsLoading(true);
		if (!updateAccountIsValid()) return;
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

	return (
		<>
			<Breadcrumb />
			<Container
				sx={{
					minHeight: { xs: 'unset', md: '31.25rem' },
					maxWidth: '96.25rem !important',
					position: 'relative',
					p: { xs: 0 },
					pr: { xs: 0, md: 6 },
					pl: { xs: 0, md: 6 },
				}}>
				<Grid container>
					<AccountSidePanel />
					<Grid
						item
						xs={12}
						sm={12}
						md={10}
						sx={{
							minHeight: '31.25rem',
							pt: 8,
							pl: { xs: 2, md: 6 },
							pr: { xs: 2, md: 0 },
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
								<Typography variant="h1">
									<FormattedMessage id="BuyerAccount.Title" />
								</Typography>
								<Typography variant="h4">
									{account?.email}
								</Typography>
								<Typography
									variant="h2"
									sx={{ fontSize: '1.25rem', mt: 6 }}>
									<FormattedMessage id="BuyerAccount.Subtitle.UpdateAccountDetails" />
								</Typography>
								<Typography variant="body1" sx={{ mt: 2 }}>
									<FormattedMessage id="BuyerAccount.Copy.UpdateAccountDetails" />
								</Typography>
								<Typography variant="body2" sx={{ mb: 4 }}>
									<FormattedMessage id="Generic.Required" />
								</Typography>
								<form id="form">
									<FormControl fullWidth>
										{accountFormData.map((input) => (
											<div
												key={input.id}
												style={{
													marginBottom: '1rem',
												}}>
												<InputField
													{...input}
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
											</div>
										))}
										<Box
											sx={{
												width: {
													xs: '100%',
													sm: '50%',
												},
											}}>
											<form autoComplete="on">
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
											</form>
										</Box>
										<Button
											sx={{
												maxWidth: '12.5rem',
												mt: '2.5rem',
												mb: '2.5rem',
											}}
											onClick={(e) => {
												setNewAccountDetails();
												clearForm(e);
											}}
											color="primary"
											variant="contained"
											className="signup-button">
											<FormattedMessage id="BuyerAccount.Subtitle.UpdateAccount" />
										</Button>
									</FormControl>
								</form>
							</>
						) : (
							<Grid
								container
								sx={{
									placeContent: 'center',
									minHeight: '42.25rem',
								}}>
								<Typography>
									<FormattedMessage id="BuyerAccount.Subtitle.LogInPrompt" />
								</Typography>
							</Grid>
						)}
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
