import { useContext } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { CirculateContext } from '../context/CirculateContextWrapper';
import DiscountBanner from '../banners/DiscountBanner';
import DiscountAppliedBanner from '../banners/DiscountAppliedBanner';

export default function DialogModal({
	id,
	open,
	handleClose,
	title,
	content,
	onClose,
	onConfirm,
	onCloseText,
	onConfirmText,
	color,
	banner,
}) {
	const { cart, discounts } = useContext(CirculateContext);
	const intl = useIntl();
	let total = cart?.sub_total;

	return (
		<Dialog
			sx={{
				'& .MuiDialog-paper': { position: 'relative', p: 3 },
				zIndex: 999,
			}}
			maxWidth="40rem"
			PaperProps={{ elevation: 3 }}
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			aria-modal="true">
			<Button
				onClick={handleClose}
				variant="text"
				sixe="0.875rem"
				title={intl.formatMessage({ id: 'Cart.Button.RemoveItem' })}
				sx={{
					position: 'absolute',
					top: 5,
					right: 4,
				}}>
				<ClearIcon fontSize="small" />
			</Button>

			{/* Show discount banner if there is an active promotion */}
			{discounts?.nextPromotion &&
			!discounts?.appliedPromotions?.anyApplied ? (
				<>
					<div style={{ marginTop: '3.5rem' }}></div>
					<DiscountBanner />
				</>
			) : null}

			<DialogTitle id="alert-dialog-title" sx={{ fontSize: 24 }}>
				{title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText
					id="alert-dialog-description"
					sx={{ fontSize: 24 }}>
					<FormattedMessage id="Dialog.AddToCart.Copy" />
				</DialogContentText>
			</DialogContent>

			{/* Show banner when promotion discount is applied */}
			{discounts?.appliedPromotions?.anyApplied ? (
				<>
					<DiscountAppliedBanner />
					<div style={{ marginBottom: '2rem' }}></div>
				</>
			) : null}

			<DialogActions
				style={{
					justifyContent: 'flex-start',
					flexWrap: 'wrap',
					marginLeft: '10px',
				}}>
				<Button
					onClick={onClose}
					data-testid="modal-cancel"
					sx={{
						fontSize: 16,
						textDecoration: 'underline',
						textUnderlineOffset: 5,
						pb: 2,
						whiteSpace: 'nowrap',
					}}>
					{onCloseText}
				</Button>
				<Button
					onClick={() => onConfirm(id)}
					autoFocus
					data-testid="modal-accept"
					sx={{
						fontSize: 16,
						textDecoration: 'underline',
						textUnderlineOffset: 5,
						textDecorationColor: { color },
						color: { color },
						pb: 2,
						whiteSpace: 'nowrap',
					}}>
					{onConfirmText}
				</Button>
			</DialogActions>
		</Dialog>
	);
}
