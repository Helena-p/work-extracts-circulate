// uses InputField component
export const contactFormdata = [
	{
		headline: 'Generic.CompanyName',
		required: ' *',
		id: 'companyName',
		name: 'companyName',
	},
	{
		headline: 'Generic.VAT',
		star: ' *',
		id: 'vat',
		name: 'vat',
	},
	{
		headline: 'Checkout.ContactPersonFirstname',
		star: ' *',
		id: 'firstName',
		name: 'firstName',
	},
	{
		headline: 'Checkout.ContactPersonLastname',
		star: ' *',
		id: 'lastName',
		name: 'lastName',
	},
	{
		headline: 'Generic.Email',
		star: ' *',
		id: 'email',
		name: 'email',
	},
];

export const accountFormData = [
	{
		headline: 'Checkout.ContactPersonFirstname',
		required: true,
		id: 'first_name',
		name: 'first_name',
	},
	{
		headline: 'Checkout.ContactPersonLastname',
		required: true,
		id: 'last_name',
		name: 'last_name',
	},
	{
		headline: 'Checkout.AddressLine1',
		required: true,
		id: 'address1',
		name: 'address1',
	},
	{
		headline: 'Checkout.AddressLine2',
		id: 'address2',
		name: 'address2',
	},
	{
		headline: 'Generic.City',
		required: true,
		id: 'city',
		name: 'city',
	},
	{
		headline: 'Generic.StateRegion',
		id: 'state',
		name: 'state',
	},
	{
		headline: 'Generic.PostalCode',
		required: true,
		id: 'zip',
		name: 'zip',
	},
];
