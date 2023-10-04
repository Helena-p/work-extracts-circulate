import { useIntl } from 'react-intl';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

export default function DialogModal({
	id,
	open,
	handleClose,
	title,
	content,
	onCancel,
	onCancelText,
	cancelVariant,
	cancelColor,
	onClose,
	closeVariant,
	closeColor,
	onConfirm,
	onCloseText,
	onConfirmText,
	confirmVariant,
	confirmColor,
	form,
	submit = false,
	styles,
	buttonStyles,
}) {
	const intl = useIntl();
	const { closeStyles, confirmStyles } = { ...buttonStyles };

	return (
		<Dialog
			sx={{
				'& .MuiDialog-paper': {
					position: 'relative',
					p: { xs: 0, sm: 3 },
					textAlign: 'left',
				},
				zIndex: 999,
				...styles,
			}}
			fullWidth
			PaperProps={{ elevation: 3 }}
			scroll="body"
			open={open}
			onClose={handleClose}
			aria-labelledby="scroll-dialog-title"
			aria-describedby="scroll-dialog-description">
			<Button
				onClick={handleClose}
				variant="text"
				title={intl.formatMessage({ id: 'Cart.Button.RemoveItem' })}
				sx={{
					position: 'absolute',
					top: 5,
					right: 4,
				}}>
				<ClearIcon fontSize="small" />
			</Button>

			<DialogTitle id="scroll-dialog-title" sx={{ fontSize: 20, mt: 2 }}>
				{title}
			</DialogTitle>
			<DialogContent>
				<DialogContentText
					id="scroll-dialog-description"
					sx={{ fontSize: 20 }}>
					{content}
				</DialogContentText>
				{form}
			</DialogContent>

			<DialogActions
				sx={{
					justifyContent: 'flex-start',
					marginLeft: '10px',
					pb: { xs: 4, sm: 1 },
				}}>
				{onCancel && (
					<Button
						variant={cancelVariant ?? 'text'}
						color={cancelColor}
						onClick={onCancel}
						sx={{
							fontSize: 16,
						}}>
						{onCancelText}
					</Button>
				)}
				<Button
					variant={closeVariant ?? 'text'}
					color={closeColor}
					onClick={onClose}
					sx={closeStyles}>
					{onCloseText}
				</Button>
				{submit ? (
					<Button
						variant={confirmVariant ?? 'text'}
						color={confirmColor}
						form={form}
						type="submit"
						autoFocus
						data-testid="modal-accept"
						sx={confirmStyles}>
						{onConfirmText}
					</Button>
				) : (
					<Button
						variant={confirmVariant ?? 'text'}
						color={confirmColor}
						onClick={() => onConfirm(id)}
						autoFocus
						data-testid="modal-accept"
						sx={confirmStyles}>
						{onConfirmText}
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
}
