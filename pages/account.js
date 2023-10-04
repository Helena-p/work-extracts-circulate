import { useContext } from 'react';
import { FormattedMessage } from 'react-intl';
import { Container, Grid, Button, Typography } from '@mui/material';
import Link from 'next/link';
import AccountSidePanel from '../../../components/menu/AccountSidePanel';
import { CirculateContext } from '../../../components/context/CirculateContextWrapper';
import Breadcrumb from '../../../components/generic/Breadcrumb';

export default function AccountPage() {
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
						<Link
							href="./account/change-password"
							passHref
							legacyBehavior>
							<Button sx={{ width: '100%' }}>
								<Typography
									variant="h2"
									sx={{ fontSize: '1.25rem' }}>
									<FormattedMessage id="BuyerAccount.Subtitle.ChangePassword" />
								</Typography>
							</Button>
						</Link>
						<Link
							href="./account/update-account"
							passHref
							legacyBehavior>
							<Button sx={{ width: '100%' }}>
								<Typography
									variant="h2"
									sx={{ fontSize: '1.25rem' }}>
									<FormattedMessage id="BuyerAccount.Subtitle.UpdateAccountDetails" />
								</Typography>
							</Button>
						</Link>
						<Link
							href="./account/delete-account"
							passHref
							legacyBehavior>
							<Button sx={{ width: '100%' }}>
								<Typography
									variant="h2"
									sx={{ fontSize: '1.25rem' }}>
									<FormattedMessage id="BuyerAccount.Subtitle.DeleteAccount" />
								</Typography>
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
