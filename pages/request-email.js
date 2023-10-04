import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Grid, Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import SignupLink from '../../../components/layout/signupLink';
import { recoverAccount } from '../../../backend/backend';
import { SITE_URL } from '../../../util/settings';

export default function RequestPasswordEmailPage() {
	const [email, setEmail] = useState('');
	const { formatMessage } = useIntl();
	let router = useRouter();

	const setUserEmail = (e) => setEmail(e.target.value);

	let resetPasswordHandler = async () => {
		await recoverAccount({
			email: email,
			reset_url: `${SITE_URL}/buyer/password/{reset_key}`,
		});
		router.push('./email-confirmation');
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
							<Typography
								variant="h1"
								color="primary"
								sx={{ py: 1 }}>
								<FormattedMessage id="PasswordRequestEmail.Page.Header" />
							</Typography>
							<Typography variant="body1" sx={{ m: 2 }}>
								<FormattedMessage id="PasswordRequestEmail.Page.Text" />
							</Typography>
						</Grid>
						<Grid
							container
							spacing={0}
							className="signup-form-block">
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="account-email"
									label={formatMessage({
										id: 'Generic.Email',
									})}
									name="email"
									autoComplete="email"
									value={email}
									onChange={setUserEmail}
								/>
							</Grid>
							<Grid item xs={12} sx={{ py: 1 }}>
								<Button
									onClick={resetPasswordHandler}
									variant="contained"
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
					</Stack>
				</Grid>
			</Grid>
		</>
	);
}
