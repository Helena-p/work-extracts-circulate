import { FormattedMessage } from 'react-intl';
// using formField as form
export const inputs = [
	{
		id: 'account-first-name',
		name: 'firstName',
		type: 'text',
		label: <FormattedMessage id="Generic.FirstName" />,
		inputLabel: <FormattedMessage id="Generic.FirstName" />,
		required: true,
		autoComplete: null,
	},
	{
		id: 'account-last-name',
		name: 'lastName',
		type: 'text',
		label: <FormattedMessage id="Generic.LastName" />,
		inputLabel: <FormattedMessage id="Generic.LastName" />,
		required: true,
		autoComplete: null,
	},
	{
		id: 'account-company-name',
		name: 'companyName',
		type: 'business',
		label: <FormattedMessage id="Generic.CompanyName" />,
		inputLabel: <FormattedMessage id="Generic.CompanyName" />,
		required: true,
		autoComplete: null,
	},
	{
		id: 'account-email',
		name: 'email',
		type: 'email',
		label: <FormattedMessage id="Generic.Email" />,
		inputLabel: <FormattedMessage id="Generic.Email" />,
		required: true,
		autoComplete: 'username',
	},
	{
		id: 'account-password',
		htmlFor: 'account-password',
		name: 'password',
		type: 'password',
		label: <FormattedMessage id="Generic.Password" />,
		inputLabel: <FormattedMessage id="Generic.Password" />,
		required: true,
		autoComplete: 'new-password',
	},
	{
		id: 'account-password-repeat',
		htmlFor: 'account-password-repeat',
		name: 'passwordRepeat',
		type: 'password',
		label: <FormattedMessage id="Generic.PasswordRepeat" />,
		inputLabel: <FormattedMessage id="Generic.PasswordRepeat" />,
		required: true,
		autoComplete: 'new-password',
	},
];
