import { useState, useContext } from 'react';
import { Container, Stack, Grid, Box, Button, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage } from 'react-intl';

import { updateAccount } from '../../../../backend/backend';
import { CirculateContext } from '../../../../components/context/CirculateContextWrapper';
import AccountSidePanel from '../../../../components/menu/AccountSidePanel';
import { useFormControls } from '../../../../functions/signup/formControls';
import { inputs } from '../../../../functions/signup/formData';
import FormField from '../../../../components/generic/FormField';
import Breadcrumb from '../../../../components/generic/Breadcrumb';

export default function ChangePasswordPage() {
	const [isOpen, setIsOpen] = useState(false);
	const { account, refreshAccount, isLoggedIn } =
		useContext(CirculateContext);
	const { handleInputValue, passwordIsValid, errors, values } =
		useFormControls(resetPasswordHandler);

	async function resetPasswordHandler() {
		if (!isLoggedIn) return;
		await updateAccount({
			password: values.password,
		});
		refreshAccount();
		setIsOpen(true);
	}

	return (
		<>
			<Breadcrumb />
			<Container
				sx={{
					minHeight: { xs: 'unset', md: '31.25rem' },
					maxWidth: '96.25rem !important',
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
						<Stack
							sx={{
								width: 'max-content',
								position: 'absolute',
								top: '10%',
								right: '10%',
							}}
							spacing={2}>
							<Collapse in={isOpen}>
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
									<FormattedMessage id="Alert.Success.Password" />
								</Alert>
							</Collapse>
						</Stack>
						<Typography variant="h1">
							<FormattedMessage id="BuyerAccount.Title" />
						</Typography>
						<Typography variant="h4">{account?.email}</Typography>
						<Stack>
							<Typography
								variant="h2"
								sx={{ fontSize: '1.25rem', mt: '2.5rem' }}>
								<FormattedMessage id="BuyerAccount.Subtitle.ChangePassword" />
							</Typography>
						</Stack>
						<Box sx={{ maxWidth: '25rem' }}>
							<Grid
								container
								spacing={0}
								className="signup-form-block">
								{inputs.slice(-2).map((input) => (
									<Grid item xs={12} md={10} key={input.id}>
										<FormField
											{...input}
											value={values[input.name]}
											onChange={handleInputValue}
											onBlur={handleInputValue}
											htmlFor={input.htmlFor}
											id={input.id}
											helperText={
												errors[input.name] ?? ' '
											}
											{...(errors[input.name] && {
												error: true,
											})}
										/>
									</Grid>
								))}

								<Grid item xs={12}>
									<Button
										onClick={resetPasswordHandler}
										variant="contained"
										disabled={!passwordIsValid()}
										className="signup-button">
										<FormattedMessage id="PasswordUpdate.Button" />
									</Button>
								</Grid>
							</Grid>
						</Box>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
