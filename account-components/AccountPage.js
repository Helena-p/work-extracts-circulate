import { FormattedMessage } from 'react-intl';
import { Container, Button, Typography } from '@mui/material';
import Breadcrumb from '../generic/Breadcrumb';
import AccountInfoTabs from './AccountInfoTabs';

export default function AccountPage() {
	return (
		<>
			<Typography
				variant="h2"
				component="h1"
				sx={{ mt: 3, mb: 2, mr: 3, ml: { xs: 2, md: 3 } }}>
				<FormattedMessage id="TopMenu.Label.Account" />
			</Typography>
			<AccountInfoTabs />
		</>
	);
}
