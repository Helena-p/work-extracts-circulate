import { useState } from 'react';
import {
	FormControl,
	FormHelperText,
	InputLabel,
	OutlinedInput,
	TextField,
	InputAdornment,
	IconButton,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useIntl } from 'react-intl';

export default function FormField({
	htmlFor,
	label,
	inputLabel,
	autoComplete,
	errorMessage,
	onChange,
	id,
	pattern,
	helperText,
	...formProps
}) {
	const { formatMessage } = useIntl();
	const [visible, setVisible] = useState(false);
	const isPassword = formProps.type === 'password';

	const handleClickShowPassword = () => {
		setVisible(!visible);
	};

	return (
		<>
			<FormControl fullWidth sx={{ my: 0.5 }}>
				{isPassword ? (
					<>
						<InputLabel htmlFor={htmlFor}>{label}</InputLabel>
						<OutlinedInput
							id={id}
							aria-live="polite"
							aria-atomic="true"
							className="password-error-icon"
							{...formProps}
							type={visible ? 'text' : 'password'}
							inputProps={{ pattern: pattern }}
							label={label}
							autoComplete={autoComplete}
							onChange={onChange}
							sx={{
								'& .MuiFormHelperText-root > .MuiTypography-root':
									{
										fontSize: '12px',
									},
							}}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										title={formatMessage({
											id: 'Toggle.Password.Visibility',
										})}
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										edge="end">
										{visible ? (
											<VisibilityOffOutlinedIcon />
										) : (
											<VisibilityOutlinedIcon />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText
							component="span"
							sx={{
								'& .MuiTypography-body1': {
									fontSize: '12px',
								},
								color: 'error.main',
							}}>
							{helperText}
						</FormHelperText>
					</>
				) : (
					<>
						<TextField
							required
							aria-live="polite"
							aria-atomic="true"
							{...formProps}
							inputProps={{ pattern: pattern }}
							label={inputLabel}
							autoComplete={
								autoComplete !== null ? autoComplete : null
							}
							onChange={onChange}
							sx={{
								my: 0,
								'& .MuiFormHelperText-root > .MuiTypography-root':
									{
										fontSize: '12px',
									},
							}}
						/>
						<FormHelperText
							component="span"
							sx={{
								'& .MuiTypography-body1': {
									fontSize: '12px',
								},
								color: 'error.main',
							}}>
							{helperText}
						</FormHelperText>
					</>
				)}
			</FormControl>
		</>
	);
}
