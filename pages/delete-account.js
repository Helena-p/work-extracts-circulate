import { useContext } from 'react';
import { Container, Stack, Grid, Typography } from '@mui/material';
import { FormattedMessage } from 'react-intl';
import AccountSidePanel from '../../../../components/menu/AccountSidePanel';
import Breadcrumb from '../../../../components/generic/Breadcrumb';

import { CirculateContext } from '../../../../components/context/CirculateContextWrapper';

export default function DeleteAccount() {
	const { account } = useContext(CirculateContext);

	return (
		<>
			<Breadcrumb />
			<Container
				sx={{
					minHeight: { xs: 'unset', md: '31.25rem' },
					maxWidth: '96.25rem !important',
					p: { xs: 0 },
					pr: { xs: 0, md: 6 },
					pl: { xs: 0, md: 6 },
				}}>
				<Grid container>
					<AccountSidePanel />
					<Grid
						item
						xs={12}
						sm={12}
						md={10}
						sx={{
							minHeight: '31.25rem',
							pt: 8,
							pl: { xs: 2, md: 6 },
							pr: { xs: 2, md: 0 },
						}}>
						<Typography variant="h1">
							<FormattedMessage id="BuyerAccount.Title" />
						</Typography>
						<Typography variant="h4">{account?.email}</Typography>
						<Typography
							variant="h2"
							sx={{ fontSize: '1.25rem', mt: '2.5rem' }}>
							<FormattedMessage id="BuyerAccount.Subtitle.DeleteAccount" />
						</Typography>

						<Stack>
							<Typography sx={{ maxWidth: '70ch' }}>
								<FormattedMessage id="BuyerAccount.Copy.DeleteAccount" />
							</Typography>
						</Stack>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
