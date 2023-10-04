import { useState, useContext } from 'react';
import { FormattedMessage, FormattedDate, useIntl } from 'react-intl';
import {
	Box,
	Stack,
	TextField,
	Button,
	Typography,
	Collapse,
	IconButton,
} from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CloseIcon from '@mui/icons-material/Close';
import { tokenizeCard, createCard } from '../../../backend/backend';
import { CirculateContext } from '../../context/CirculateContextWrapper';

export default function AddCardForm({ onCancel, onSave }) {
	const INITIAL_STATE = {
		cardNumber: '',
		fullName: '',
		monthYear: '',
		cvc: '',
	};
	let [open, setOpen] = useState(false);
	let [errorMessage, setErrorMessage] = useState('');
	const [values, setValues] = useState(INITIAL_STATE);
	const { account, setIsLoading } = useContext(CirculateContext);
	const { formatMessage } = useIntl();

	const tokenizeCreditCard = async (values) => {
		let month = values.monthYear.split('-')[1];
		let year = values.monthYear.split('-')[0];

		try {
			let card = await tokenizeCard({
				number: values.cardNumber,
				exp_month: month,
				exp_year: year,
				cvc: values.cvc,
				// Note: some payment gateways may require a Swell `account_id` and `billing` for card verification (Braintree)
				account_id: account.id,
			});
			if (card.token) {
				onSave(card.token);
				setValues(INITIAL_STATE);
			}
		} catch (error) {
			console.warn(error.message);
			setErrorMessage(error.message);
			setOpen(true);
		}
	};

	const onInputHandler = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	return (
		<Box sx={{ position: 'relative' }}>
			<Collapse in={open} sx={{ position: 'absolute', top: 0, right: 0 }}>
				<Alert
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
					severity="error">
					<AlertTitle>{errorMessage}</AlertTitle>
				</Alert>
			</Collapse>

			<Stack
				component="form"
				spacing={3}
				sx={{
					my: 3,
					py: 3,
					px: 2,
					width: '100%',
					backgroundColor: 'background.paper',
					boxShadow: '0px 4px 8px rgba(144, 171, 169, 0.2)',
					borderRadius: '10px',
					border: '1px solid #006E66',
				}}>
				<Typography variant="h5" component="h3">
					New card
				</Typography>
				<TextField
					required
					inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
					type="text"
					label={formatMessage({ id: 'Generic.CardNumber' })}
					id="cardNumber"
					name="cardNumber"
					size="small"
					value={values.cardNumber}
					onChange={onInputHandler}
				/>
				<TextField
					required
					type="text"
					label={formatMessage({ id: 'Card.Cardholder.Fullname' })}
					id="fullName"
					name="fullName"
					size="small"
					value={values.fullName}
					onChange={onInputHandler}
				/>
				<Stack
					sx={{
						width: '100%',
						gap: 3,
						flexDirection: {
							xs: 'column',
							sm: 'row',
							md: 'column',
						},
					}}>
					<TextField
						fullWidth
						required
						type="month"
						label={formatMessage({ id: 'Card.Expiration.Date' })}
						id="monthYear"
						name="monthYear"
						placeholder="yyyy-mm"
						InputLabelProps={{
							shrink: true,
						}}
						size="small"
						value={values.monthYear}
						onChange={onInputHandler}
					/>
					<TextField
						fullWidth
						required
						type="number"
						label="CVC/CVC2"
						id="cvc"
						name="cvc"
						InputLabelProps={{
							shrink: true,
						}}
						size="small"
						value={values.cvc}
						onChange={onInputHandler}
					/>
				</Stack>
				<Button
					variant="contained"
					onClick={() => tokenizeCreditCard(values)}>
					<FormattedMessage id="Generic.Save" />
				</Button>
				<Button
					variant="text"
					onClick={(e) => {
						onCancel(e);
						setValues({});
					}}>
					<FormattedMessage id="Generic.Cancel" />
				</Button>
			</Stack>
		</Box>
	);
}
