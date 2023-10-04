import { FormattedMessage } from 'react-intl';
import Link from 'next/link';
import { Grid, Stack } from '@mui/material';
import { Link as MuiLink } from '@mui/material';
import Typography from '@mui/material/Typography';

import SignupLink from '../../../components/layout/signupLink';

export default function EmailConfirmationPage() {
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
								textAlign="center">
								<FormattedMessage id="PasswordResetConfirmation.Page.Header" />
							</Typography>
							<Typography variant="body1" sx={{ m: 2 }}>
								<FormattedMessage id="PasswordResetConfirmation.Page.Text" />
							</Typography>
						</Grid>
						<Grid
							container
							spacing={0}
							className="signup-form-block">
							<Grid item xs={12}>
								<Link
									href="/buyer/signup#login"
									passHref
									legacyBehavior>
									<MuiLink
										variant="contained"
										className="forms-link link-secondary-cta">
										<Typography
											variant="h4"
											sx={{
												textAlign: 'center',
												textUnderlineOffset: '5px',
											}}>
											<FormattedMessage id="PasswordResetConfirmation.Page.TextLink" />
										</Typography>
									</MuiLink>
								</Link>
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
