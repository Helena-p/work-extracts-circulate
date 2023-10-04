import { useState, useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import {
	Grid,
	Stack,
	Button,
	FormControlLabel,
	Checkbox,
	Typography,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Alert,
	AlertTitle,
	Collapse,
} from '@mui/material';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { capitalizeFirstLetter } from '../../functions/products/variants';
import { CirculateContext } from '../context/CirculateContextWrapper';
import { createAccount } from '../../backend/backend';
import FormField from '../generic/FormField';
import { useFormControls } from '../../functions/signup/formControls';
import { inputs } from '../../functions/signup/formData';

import { trackCreateAccount } from '../../functions/tracking/dataLayer';

export default function CreateAccountPanel() {
	const [dialogOpen, setDialogOpen] = useState(false);
	const [alertOpen, setAlertOpen] = useState({ open: false, error: '' });
	const [isSaving, setIsSaving] = useState(false);
	const [agreeToTerms, setAgreeToTerms] = useState(false);
	const { refreshAccount, account } = useContext(CirculateContext);
	const router = useRouter();
	const affiliation = router.query.affiliation;
	const { handleInputValue, formIsValid, errors, setErrors, values } =
		useFormControls(agreeToTerms);

	const signup = async (e) => {
		if (!formIsValid()) return;
		try {
			let result = await createAccount({
				email: values.email,
				first_name: values.firstName,
				last_name: values.lastName,
				name: values.companyName,
				password: values.password,
				type: 'business',
				group: 'buyers',
				// Set metadata only if affiliation is present
				...(affiliation && {
					metadata: {
						affiliation,
					},
				}),
			});

			if (result?.email?.message) {
				setErrors({
					...errors,
					email: (
						<Typography
							role="log"
							aria-live="polite"
							aria-atomic="true">
							<FormattedMessage id="BuyerSignup.Text.AccountAlreadyExist" />
						</Typography>
					),
				});
			} else {
				trackCreateAccount();
				setIsSaving(true);
				await refreshAccount();
				// Push to external page success if affiliation is present
				if (affiliation) {
					router.push(`/buyer/signup/success/${affiliation}`);
				} else {
					setDialogOpen(true);
				}
			}
		} catch (error) {
			console.warn(error);
			setAlertOpen({ ...alertOpen, open: true, error: error.message });
		} finally {
			setIsSaving(false);
		}
	};

	const handleClose = () => {
		setDialogOpen(false);
		router.push('/shop');
	};

	return (
		<>
			<Stack sx={{ p: { xs: 0, tablet: 2 } }}>
				<Collapse
					in={alertOpen.open}
					timeout={{
						appear: 1000,
						enter: 300,
						exit: 500,
					}}>
					<Alert severity="error">
						<AlertTitle>{alertOpen.error}</AlertTitle>
					</Alert>
				</Collapse>

				<Typography variant="h3" component="h2" sx={{ py: 4 }}>
					<FormattedMessage id="BuyerSignup.Page.Subtitle" />
				</Typography>
				{inputs.map((input) => (
					<FormField
						key={input.id}
						{...input}
						aria-label={input.name}
						value={values[input.name]}
						onChange={handleInputValue}
						onBlur={handleInputValue}
						htmlFor={input.htmlFor}
						id={input.id}
						helperText={errors[input.name] ?? ' '}
						{...(errors[input.name] && {
							error: true,
						})}
					/>
				))}

				<Grid
					item
					xs={12}
					sx={{
						alignItems: 'flex-start',
						flexDirection: 'column',
						gap: '0.75rem',
						pt: 2,
						pb: 1,
					}}>
					<FormControlLabel
						sx={{
							alignItems: 'flex-start',
							'& > span': {
								pt: 0,
							},
						}}
						control={
							<Checkbox value="agreeToTerms" color="primary" />
						}
						onChange={(e) =>
							e.target.checked
								? setAgreeToTerms(true)
								: setAgreeToTerms(false)
						}
						label={
							<Typography variant="body2" sx={{ mb: 0 }}>
								<FormattedMessage
									id="BuyerSignup.Text.AgreeTo"
									values={{
										b: (chunks) => <b>{chunks}</b>,
										privacy: (
											<Link
												href="/other/privacy-policy"
												color="primary.main">
												<FormattedMessage id="Generic.PrivacyPolicy" />
											</Link>
										),
									}}
								/>
							</Typography>
						}
					/>
				</Grid>
				<Button
					variant="contained"
					disabled={!formIsValid() || isSaving || !!account}
					onClick={signup}
					sx={{
						width: 100,
						ml: 'auto',
						mt: 2,
						whiteSpace: 'nowrap',
					}}>
					{isSaving ? (
						<CircularProgress size={22} color="inherit" />
					) : (
						<FormattedMessage id="Generic.Signup" />
					)}
				</Button>
			</Stack>
			<Dialog
				open={dialogOpen}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
				PaperProps={{ elevation: 3 }}
				fullWidth={true}
				maxWidth="sm"
				sx={{
					'& .MuiDialog-paper': {
						p: { xs: 0.5, sm: 3 },
					},
				}}>
				<DialogTitle id="alert-dialog-title">
					<FormattedMessage
						id="Alert.Welcome"
						values={{
							firstname:
								capitalizeFirstLetter(values.firstName) ?? '',
							lastname:
								capitalizeFirstLetter(values.lastName) ?? '',
						}}
					/>
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						<FormattedMessage id="Alert.Success.CreateAccount" />
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>
						<FormattedMessage id="RFQ.Confirmation.ShopButton" />
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
