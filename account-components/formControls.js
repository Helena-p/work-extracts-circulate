import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Typography } from '@mui/material';

export const useFormControls = (agree) => {
	const [errors, setErrors] = useState({});
	const [values, setValues] = useState({
		email: '',
		firstName: '',
		lastName: '',
		companyName: '',
		vat: '',
		password: '',
		passwordRepeat: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		zip: '',
		country: '',
	});

	const validate = (fieldValues = values) => {
		// check if the form values are valid
		let temp = { ...errors };

		if ('firstName' in fieldValues)
			temp.firstName = fieldValues.firstName ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Required" />
				</Typography>
			);
		if (fieldValues.firstName)
			temp.firstName = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/.test(
				fieldValues.firstName
			) ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Firstname" />
				</Typography>
			);

		if ('lastName' in fieldValues)
			temp.lastName = fieldValues.lastName ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Required" />
				</Typography>
			);
		if (fieldValues.lastName)
			temp.lastName = /([a-zA-Z',.-]+( [a-zA-Z',.-]+)*){2,30}/.test(
				fieldValues.lastName
			) ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Lastname" />
				</Typography>
			);

		if ('companyName' in fieldValues)
			temp.companyName = fieldValues.companyName ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Required" />
				</Typography>
			);
		if (fieldValues.companyName)
			temp.companyName =
				/^[.@&]?[a-zA-Z0-9 ]+[ !.@&()]?[ a-zA-Z0-9!()]+/.test(
					fieldValues.companyName
				) ? (
					''
				) : (
					<Typography
						role="log"
						aria-live="polite"
						aria-atomic="true">
						<FormattedMessage id="Generic.Errormessage.Companyname" />
					</Typography>
				);

		if ('email' in fieldValues) {
			temp.email = fieldValues.email ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Required" />
				</Typography>
			);
			if (fieldValues.email)
				temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(
					fieldValues.email
				) ? (
					''
				) : (
					<Typography
						role="log"
						aria-live="polite"
						aria-atomic="true">
						<FormattedMessage id="Generic.Errormessage.Email" />
					</Typography>
				);
		}

		if ('password' in fieldValues) {
			temp.password = fieldValues.password ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Required" />
				</Typography>
			);
			if (fieldValues.password)
				temp.password =
					/^(?=.*[0-9])(?=.*[a-zA-ZÀ-ȕ])(?=.*[\?\/\\\[\]!@#$€%^&*"{}()|=+´`'¨,._-])[a-zA-ZÀ-ȕ0-9\?\/\\\[\]!@#$€%^&*"{}()|=+´`'¨,._-]{8,}$/.test(
						fieldValues.password
					) ? (
						''
					) : (
						<Typography
							role="log"
							aria-live="polite"
							aria-atomic="true">
							<FormattedMessage id="Generic.Errormessage.Password" />
						</Typography>
					);
		}

		if ('passwordRepeat' in fieldValues) {
			temp.passwordRepeat = fieldValues.passwordRepeat ? (
				''
			) : (
				<Typography role="log" aria-live="polite" aria-atomic="true">
					<FormattedMessage id="Generic.Errormessage.Required" />
				</Typography>
			);
			if (fieldValues.passwordRepeat)
				temp.passwordRepeat =
					fieldValues.passwordRepeat === values.password ? (
						''
					) : (
						<Typography
							role="log"
							aria-live="polite"
							aria-atomic="true">
							<FormattedMessage id="Generic.Errormessage.Password.Repeat" />
						</Typography>
					);
		}

		setErrors({
			...temp,
		});
	};

	const handleInputValue = (e) => {
		// triggered by the text field's onBlur and onChange events
		setValues({ ...values, [e.target.name]: e.target.value });
		validate({ [e.target.name]: e.target.value });
	};

	const formIsValid = (fieldValues = values) => {
		// checks the form values and return a boolean
		const isValid =
			fieldValues.firstName &&
			fieldValues.lastName &&
			fieldValues.companyName &&
			fieldValues.email &&
			fieldValues.password &&
			fieldValues.passwordRepeat &&
			agree;
		Object.values(errors).every((x) => x === '');

		return isValid;
	};

	const updateAccountIsValid = (fieldValues = values) => {
		// checks the form values and return a boolean
		const isValid =
			fieldValues.firstName &&
			fieldValues.lastName &&
			fieldValues.companyName &&
			fieldValues.email;
		Object.values(errors).every((x) => x === '');

		return isValid;
	};

	const passwordIsValid = (fieldValues = values) => {
		const isValid = fieldValues.password === fieldValues.passwordRepeat;
		Object.values(errors).every((x) => x === '');
		return isValid;
	};

	return {
		handleInputValue,
		updateAccountIsValid,
		passwordIsValid,
		formIsValid,
		errors,
		setErrors,
		values,
		setValues,
	};
};
