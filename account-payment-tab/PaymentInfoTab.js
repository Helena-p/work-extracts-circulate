import { useState, useEffect, useContext, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
	Stack,
	Paper,
	Grid,
	Typography,
	Button,
	Collapse,
	Fade,
} from '@mui/material';

import PaymentsCardFooter from './PaymentsCardFooter';
import AddCardForm from './AddCardForm';
import OrderTable from './OrderTable';
import { OrderItemCard } from '../../orders/OrderItemCard';
import { PaymentCard } from '../../orders/PaymentCard';
import { CirculateContext } from '../../context/CirculateContextWrapper';
import {
	getCardList,
	createCard,
	deleteCard,
	listOrders,
} from '../../../backend/backend';

export default function PaymentInfoTab() {
	let [savedCards, setSavedCards] = useState([]);
	let [formIsVisible, setFormIsVisible] = useState(false);
	let [orderList, setOrderList] = useState();
	const { account, refreshAccount, isLoading, setIsLoading } =
		useContext(CirculateContext);
	const { formatMessage } = useIntl();
	const orderPagePrefix = '/dashboard/orders/';

	// Load previously used cards to choose from
	let loadCards = useCallback(async () => {
		try {
			setIsLoading(true);
			let cards = await getCardList();
			if (cards?.results) {
				setSavedCards(cards.results);
			}
		} catch (error) {
			console.error(error);
			setSavedCards([]);
		} finally {
			setIsLoading(false);
		}
	}, [setIsLoading]);

	let loadOrderList = useCallback(async () => {
		try {
			let loadedOrderList = await listOrders({
				limit: 100,
				page: 1,
			});
			setOrderList(loadedOrderList);
		} catch (error) {
			console.error(error);
			setOrderList();
		}
	}, []);

	// Load order data after account has loaded
	useEffect(() => {
		if (account) {
			loadOrderList();
			loadCards();
		}
	}, [account, loadOrderList, loadCards]);

	let addCard = async (token) => {
		setIsLoading(true);
		try {
			let result = await createCard({ token });
			await refreshAccount();
			loadCards();
		} catch (error) {
			console.error(error.message);
		} finally {
			setFormIsVisible(false);
			setIsLoading(false);
		}
	};

	let onDeleteCard = async (id) => {
		try {
			let result = await deleteCard(id);
			refreshAccount();
			loadCards();
		} catch (error) {
			console.error(error.message);
		}
	};

	return (
		<Grid container maxWidth="100%" spacing={0}>
			<Grid item xs={12} sm={12} md={8}>
				<Paper
					elevation={1}
					sx={{ display: { xs: 'none', md: 'block' } }}>
					<Typography variant="h3" sx={{ pt: 3, pl: 3 }}>
						<FormattedMessage id="Generic.PaymentHistory" />
					</Typography>

					<OrderTable orderList={orderList} />
				</Paper>
				<Stack
					sx={{
						display: { xs: 'flex', md: 'none' },
						gap: 3,
						pl: { xs: 2, sm: 0 },
					}}>
					<Typography variant="h3" sx={{ pt: 3 }}>
						<FormattedMessage id="Generic.PaymentHistory" />
					</Typography>

					{orderList?.results.map((order) => (
						<OrderItemCard
							key={order.id}
							order={order}
							orderPagePrefix={orderPagePrefix}
						/>
					))}
				</Stack>
			</Grid>

			<Grid item xs={12} sm={12} md={4} sx={{ pl: { md: 2 } }}>
				<Paper
					sx={{
						boxShadow: { xs: 0, md: 1 },
						backgroundColor: {
							xs: 'background.default',
							md: 'background.paper',
						},
						py: 3,
						pl: { md: 2 },
						pr: { md: 2 },
						mx: { xs: 2, sm: 0 },
					}}>
					<Typography variant="h3" sx={{ pb: 3 }}>
						<FormattedMessage id="Generic.SavedCards" />
					</Typography>
					<Stack sx={{ gap: 1 }}>
						{savedCards.map((card) => (
							<PaymentCard
								key={card.id}
								card={card}
								removable={true}
								onDelete={(e) => onDeleteCard(card.id)}
							/>
						))}
					</Stack>
					<Fade in={!formIsVisible}>
						<Button
							variant="outlined"
							fullWidth
							onClick={(e) => setFormIsVisible(true)}
							sx={{ mt: 3 }}>
							+ <FormattedMessage id="Card.AddNew" />
						</Button>
					</Fade>
					<Collapse in={formIsVisible}>
						<AddCardForm
							onCancel={() => setFormIsVisible(false)}
							onSave={(card) => addCard(card)}
						/>
					</Collapse>

					<PaymentsCardFooter />
				</Paper>
			</Grid>
		</Grid>
	);
}
