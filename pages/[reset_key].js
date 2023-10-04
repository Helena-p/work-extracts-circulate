import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Grid, Stack, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import SignupLink from '../../../components/layout/signupLink';
import { recoverAccount } from '../../../backend/backend';

export default function PasswordResetPage() {
	const [password, setPassword] = useState('');
	const [passwordRepeat, setPasswordRepeat] = useState('');
	const [error, setError] = useState('');

	const router = useRouter();
	const { formatMessage } = useIntl();

	const thePath = router.asPath;
	const resetKey = thePath.substring(thePath.lastIndexOf('/') + 1);

	let resetPassword = (e) => {
		setPassword(e.target.value);
	};

	let resetPasswordRepeat = (event) => {
		setPasswordRepeat(event.target.value);
	};

	let passwordsMismatch = password !== passwordRepeat;
	let disableResetButton = passwordsMismatch;

	let resetPasswordHandler = async () => {
		try {
			await recoverAccount({
				password: password,
				reset_key: resetKey,
			});
			router.push('./reset-confirmation');
		} catch (error) {
			if (error.message === 'Missing `password` to reset account access')
				setError('PasswordReset.Page.Error.InvalidPassword');
			else if (
				error.message === 'Invalid `password_reset_key`, key not found'
			)
				setError('PasswordReset.Page.Error');
			else {
				setError('PasswordReset.Page.Error.Unknown');
				console.error(error.message);
			}
		}
	};
	return (
		<>
			<Grid container justifyContent="center" sx={{ pt: 20, mb: 30 }}>
				<Grid
					item
					xs={11}
					sm={6}
					md={5}
					lg={4}
					xl={3}
					className="signup-block">
					<Stack>
						<Grid item xs={12}>
							<Typography variant="h1" color="primary">
								<FormattedMessage id="PasswordReset.Page.Header" />
							</Typography>
							<Typography variant="body1" sx={{ m: 2 }}>
								<FormattedMessage id="PasswordReset.Page.Text" />
							</Typography>
						</Grid>
						{error && (
							<Box sx={{ textAlign: 'center', color: '#9a3131' }}>
								<FormattedMessage
									id={error}
									className="login-error"
								/>
							</Box>
						)}
						<form>
							<Grid
								container
								spacing={0}
								className="signup-form-block">
								<Grid item xs={12}>
									<TextField
										sx={{ display: 'none' }}
										fullWidth
										id="account-email"
										label={formatMessage({
											id: 'Generic.Email',
										})}
										type="email"
										name="email"
										autoComplete="username"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="account-password"
										type="password"
										name="password"
										label={formatMessage({
											id: 'Generic.Password',
										})}
										value={password}
										onChange={resetPassword}
										autoComplete="new-password"
									/>
								</Grid>
								<Grid item xs={12}>
									<TextField
										required
										fullWidth
										id="account-password-repeat"
										type="password"
										name="password"
										label={formatMessage({
											id: 'Generic.PasswordRepeat',
										})}
										value={passwordRepeat}
										onChange={resetPasswordRepeat}
										autoComplete="new-password"
									/>
								</Grid>
								<Grid item xs={12}>
									<Button
										onClick={resetPasswordHandler}
										variant="contained"
										disabled={disableResetButton}
										className="signup-button">
										<FormattedMessage id="PasswordReset.Page.Button" />
									</Button>
								</Grid>
								<SignupLink
									href="/buyer/signup"
									linkTextId_1="BuyerLogin.Text.NoAccountSignUp"
									linkTextId_2="Generic.Signup"
								/>
							</Grid>
						</form>
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}
