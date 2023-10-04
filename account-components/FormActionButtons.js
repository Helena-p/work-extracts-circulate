import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Stack, Button } from '@mui/material';

export default function FormActionButtons({ onClear, formId, disabled }) {
	return (
		<>
			<Stack
				alignItems="center"
				sx={{ flexDirection: { xs: 'column', sm: 'row' }, gap: 3 }}>
				<Button
					variant="text"
					onClick={onClear}
					sx={{ p: 1, whiteSpace: 'nowrap', height: 'min-content' }}>
					<FormattedMessage id="Generic.ClearForm" />
				</Button>
				<Button
					sx={{
						maxWidth: '6rem',
						mt: '2.5rem',
						mb: '2.5rem',
						'&.Mui-disabled': {
							backgroundColor: 'rgba(0, 110, 102, 0.12)',
							color: '#c0c0c0',
						},
					}}
					disabled={disabled}
					form={formId ?? null}
					variant="contained"
					color="primary"
					size="small"
					className="signup-button"
					type="submit">
					<FormattedMessage id="Generic.Save" />
				</Button>
			</Stack>
		</>
	);
}
