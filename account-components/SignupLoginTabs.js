import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { Box, Tabs, Tab } from '@mui/material';

import CreateAccountPanel from './CreateAccountPanel';
import LoginPanel from './LoginPanel';

function TabPanel(props) {
	const { children, value, href, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<div>{children}</div>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function SignupLoginTabs() {
	const [value, setValue] = useState(0);
	const { formatMessage } = useIntl();
	const router = useRouter();

	useEffect(() => {
		router.asPath.includes('#login') ? setValue(1) : setValue(0);
	}, [router, setValue]);

	const handleChange = (event, newValue) => {
		setValue(newValue);
		newValue === 0
			? (location.hash = '#create-account')
			: (location.hash = '#login');
	};

	return (
		<>
			<Box sx={{ minHeight: 840, width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs
						value={value}
						onChange={handleChange}
						aria-label="Log in and signup">
						<Tab
							sx={{ px: 3, width: '50%' }}
							label={formatMessage({
								id: 'BuyerSignup.Page.Header',
							})}
							{...a11yProps(0)}
						/>
						<Tab
							sx={{ px: 3, width: '50%' }}
							label={formatMessage({
								id: 'BuyerLogin.Page.Header',
							})}
							{...a11yProps(1)}
						/>
					</Tabs>
				</Box>
				<TabPanel value={value} index={0}>
					<CreateAccountPanel onClick={(e) => handleChange(e, 1)} />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<LoginPanel onClick={(e) => handleChange(e, 0)} />
				</TabPanel>
			</Box>
		</>
	);
}
