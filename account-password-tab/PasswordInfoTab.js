import { useState, useContext } from 'react';
import { Stack, Grid, Box, Paper, Button, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';
import { FormattedMessage } from 'react-intl';

import { updateAccount } from '../../../backend/backend';
import { CirculateContext } from '../../context/CirculateContextWrapper';
import { useFormControls } from '../../../functions/signup/formControls';
import { inputs } from '../../../functions/signup/formData';
import FormField from '../../generic/FormField';
import AccountLoginPrompt from '../AccountLoginPrompt';

export default function PasswordInfoTab({ styles }) {
	const [isOpen, setIsOpen] = useState(false);
	const { account, refreshAccount, isLoggedIn, setIsLoading } =
		useContext(CirculateContext);
	const { handleInputValue, passwordIsValid, errors, values } =
		useFormControls(resetPasswordHandler);

	async function resetPasswordHandler() {
		if (!isLoggedIn) return;
		try {
			setIsLoading(true);
			await updateAccount({
				password: values.password,
			});
			refreshAccount();
			setIsOpen(true);
		} catch (error) {
			console.warn(error.message);
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<>
			<Paper elevation={1} sx={{ p: 3 }}>
				{isLoggedIn() ? (
					<>
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
						<Stack>
							<Typography variant="h3" component="h2">
								<FormattedMessage id="BuyerAccount.Subtitle.Password" />
							</Typography>
						</Stack>
						<Box sx={{ maxWidth: '25rem', mt: 3 }}>
							<Grid container>
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

								<Grid item xs={12} sx={{ mt: 3 }}>
									<Button
										onClick={resetPasswordHandler}
										variant="contained"
										disabled={!passwordIsValid()}
										className="signup-button"
										sx={{
											maxWidth: 'max-content',
											whiteSpace: 'nowrap',
										}}>
										<FormattedMessage id="PasswordUpdate.Button" />
									</Button>
								</Grid>
							</Grid>
						</Box>
					</>
				) : (
					<AccountLoginPrompt
						value={
							<FormattedMessage id="Generic.PasswordDetails" />
						}
					/>
				)}
			</Paper>
		</>
	);
}
