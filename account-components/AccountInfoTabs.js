import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab } from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import LockIcon from '@mui/icons-material/Lock';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import CompanyInfoTab from './company/CompanyInfoTab';
import AddressInfoTab from './address/AddressInfoTab';
import PasswordInfoTab from './password/PasswordInfoTab';
import PaymentInfoTab from './payments/PaymentInfoTab';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			<Box sx={{ py: 3 }}>{children}</Box>
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function AccountInfoTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	return (
		<Box
			sx={{
				mx: { xs: 0, md: 2 },
				mb: 6,
				width: '100%',
			}}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					variant="scrollable"
					aria-label="Account information tabs">
					<Tab
						icon={<BusinessIcon />}
						iconPosition="start"
						label="Company details"
						{...a11yProps(0)}
						sx={{ minHeight: '48px' }}
					/>
					<Tab
						icon={<PinDropOutlinedIcon />}
						iconPosition="start"
						label="Addresses"
						{...a11yProps(1)}
						sx={{ minHeight: '48px' }}
					/>
					<Tab
						icon={<LockIcon />}
						iconPosition="start"
						label="Password"
						{...a11yProps(2)}
						sx={{ minHeight: '48px' }}
					/>
					<Tab
						icon={<CreditCardOutlinedIcon />}
						iconPosition="start"
						label="Payments"
						{...a11yProps(3)}
						sx={{ minHeight: '48px' }}
					/>
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<CompanyInfoTab />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<AddressInfoTab />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<PasswordInfoTab />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<PaymentInfoTab />
			</TabPanel>
		</Box>
	);
}
