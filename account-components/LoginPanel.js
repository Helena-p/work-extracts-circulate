import { useState, useContext } from 'react';
import Link from 'next/link';
import { FormattedMessage, useIntl } from 'react-intl';
import {
	Grid,
	Stack,
	Box,
	Button,
	TextField,
	Link as MuiLink,
	Typography,
	CircularProgress,
	Alert,
	AlertTitle,
	Collapse,
} from '@mui/material';
import { useRouter } from 'next/router';

import { CirculateContext } from '../../components/context/CirculateContextWrapper';
import { trackLoggedIn } from '../../functions/tracking/dataLayer';

export default function LoginPanel() {
	const [alertOpen, setAlertOpen] = useState(false);
	const [isLoggingIn, setIsLoggingIn] = useState(false);
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');
	let [error, setError] = useState(false);
	let { isLoggedIn, login } = useContext(CirculateContext);
	let router = useRouter();
	const { formatMessage } = useIntl();

	let { redirect } = router.query;

	let loginAccount = async (e) => {
		setError(false);
		setIsLoggingIn(true);
		e.preventDefault();
		try {
			let loginResult = await login({ email, password });
			if (loginResult) {
				setAlertOpen(true);
				// Track login
				trackLoggedIn();
				// Return to previous page
				redirect ? router.push(redirect) : router.push('/dashboard');
			} else {
				throw new Error(error);
			}
		} catch (error) {
			console.error(error);
			setError(true);
		} finally {
			setIsLoggingIn(false);
		}
	};

	// Update input fields on page
	let updateEmail = (event) => {
		setEmail(event.target.value);
	};

	let updatePassword = (event) => {
		setPassword(event.target.value);
	};

	return (
		<>
			<Box sx={{ height: 60 }}>
				<Collapse
					in={alertOpen}
					timeout={{
						appear: 1000,
						enter: 300,
						exit: 500,
					}}>
					<Alert severity="success" sx={{ mb: 2 }}>
						<AlertTitle>
							<FormattedMessage id="Alert.Success" />
						</AlertTitle>
						<FormattedMessage
							id="BuyerLogin.Confirmation"
							textAlign="center"
						/>
					</Alert>
				</Collapse>
			</Box>
			<Stack sx={{ py: 5, px: 2 }} component="form">
				<Grid item xs={12}>
					<Typography variant="h3" component="h2" sx={{ pb: 4 }}>
						<FormattedMessage id="BuyerLogin.Page.Title" />
					</Typography>
				</Grid>
				<Grid container spacing={2} justifyContent="center">
					<Grid item xs={12} sx={{ mb: 2 }}>
						<TextField
							required
							fullWidth
							id="account-email"
							label={formatMessage({ id: 'Generic.Email' })}
							name="email"
							autoComplete="email"
							value={email}
							onChange={updateEmail}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							required
							fullWidth
							id="account-password"
							value={password}
							type="password"
							onChange={updatePassword}
							autoComplete="new-password"
							name="password"
							label={formatMessage({ id: 'Generic.Password' })}
						/>
						{error ? (
							<Box>
								<Typography
									variant="body2"
									color="#d60b28"
									aria-live="assertive">
									<FormattedMessage
										id="BuyerLogin.Text.Error"
										className="login-error"
									/>
								</Typography>
							</Box>
						) : null}
					</Grid>

					<Grid item xs={12} sx={{ mt: 2 }}>
						<Link
							href="/buyer/password/request-email"
							passHref
							legacyBehavior>
							<MuiLink
								variant="contained"
								disabled={isLoggedIn()}
								textAlign="left"
								color="primary">
								<Typography variant="body2">
									<FormattedMessage id="Generic.ForgotPassword" />
								</Typography>
							</MuiLink>
						</Link>
					</Grid>
				</Grid>
				<Button
					type="submit"
					onClick={loginAccount}
					disabled={Boolean(isLoggedIn() || isLoggingIn)}
					color="primary"
					variant="contained"
					sx={{ width: 100, ml: 'auto', mt: 2 }}>
					{isLoggingIn ? (
						<CircularProgress size={22} color="inherit" />
					) : (
						<FormattedMessage id="Generic.Login" />
					)}
				</Button>
			</Stack>
		</>
	);
}
