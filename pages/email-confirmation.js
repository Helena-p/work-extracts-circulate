import { FormattedMessage, useIntl } from 'react-intl';

import { Grid, Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import SignupLink from '../../../components/layout/signupLink';

export default function EmailConfirmationPage() {
	const { formatMessage } = useIntl();

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
						<Grid item xs={12} textAlign="center">
							<Typography variant="h1" color="primary">
								<FormattedMessage id="PasswordEmailConfirmation.Page.Header" />
							</Typography>
							<Typography variant="body1" sx={{ m: 2 }}>
								<FormattedMessage id="PasswordEmailConfirmation.Page.Text" />
							</Typography>
						</Grid>
						<Grid
							container
							spacing={0}
							className="signup-form-block">
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
