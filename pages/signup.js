import React from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import {
	Grid,
	Stack,
	Box,
	Typography,
	List,
	ListItem,
	ListItemText,
	ListItemIcon,
	Container,
} from '@mui/material';
import SEO from '../../../components/seo/seo';
import SignupLoginTabs from '../../../components/buyer/SignupLoginTabs';
import BackgroundImage from '../../../components/generic/BackgroundImage';
import { FormattedMessage } from 'react-intl';

import { trackLoginClick } from '../../../functions/tracking/dataLayer';

export default function BuyerSingupPage() {
	// Tracking
	useEffect(() => {
		trackLoginClick();
	}, []);

	let item = (id, char) => (
		<ListItem sx={{ px: 0, py: 0.5 }}>
			<ListItemIcon sx={{ minWidth: '40px', pb: 2.6 }}>
				<Image
					alt=""
					src="/vectors/secondary-dark-checkmark.svg"
					width={24}
					height={24}
				/>
			</ListItemIcon>
			<ListItemText>
				<FormattedMessage
					id={id}
					values={{
						b: (chunks) => (
							<Typography variant="body1">
								<b>{chunks}</b>
							</Typography>
						),
						bolded: <FormattedMessage id={char} />,
					}}
				/>
			</ListItemText>
		</ListItem>
	);
	return (
		<>
			<SEO
				description="Circulate is your easy-to-use platform for everything packaging. We guide you to the best packaging suppliers for you and for our planet!"
				title="Marketplace for sustainable packaging"
				image="/logoSEO/logo-with-text-green.png"
				url="/signup"
			/>
			<Container maxWidth="xl" sx={{ py: 3 }}>
				<Grid
					component="main"
					container
					justifyContent="center"
					alignItems="stretch"
					sx={{ py: 3, width: '100%', maxWidth: 1100, mx: 'auto' }}>
					<Grid
						item
						xs={0}
						md={5.5}
						sx={{
							position: 'relative',
							display: { xs: 'none', md: 'block' },
							color: 'white',
							boxShadow: '0px 4px 8px rgba(144, 171, 169, 0.2)',
							borderRadius: '5px',
							p: 0,
						}}>
						<BackgroundImage
							imageSrcDesktop="/cssBackground/signup-background.png"
							radius="5px"
						/>
						<Stack
							justifyContent="space-between"
							sx={{
								position: 'relative',
								height: '100%',
								pt: 6,
								pb: 4,
								px: 4,
								gap: 3,
							}}>
							<Box>
								<Typography
									variant="h2"
									component="h1"
									sx={{ mt: 4, pb: 2 }}>
									<FormattedMessage id="BuyerSignup.Page.LeftPanel.Title" />
								</Typography>
								<List sx={{ py: 2, px: 0, fontSize: 14 }}>
									{item(
										'BuyerSignup.Page.LeftPanel.ListItem1',
										'BuyerSignup.Page.LeftPanel.ListItemChar1'
									)}
									{item(
										'BuyerSignup.Page.LeftPanel.ListItem2',
										'BuyerSignup.Page.LeftPanel.ListItemChar2'
									)}
									{item(
										'BuyerSignup.Page.LeftPanel.ListItem3',
										'BuyerSignup.Page.LeftPanel.ListItemChar3'
									)}
								</List>
								<Typography variant="body1" sx={{ py: 1 }}>
									<FormattedMessage id="BuyerSignup.Page.LeftPanel.Text" />
								</Typography>
							</Box>
							<Box sx={{ position: 'relative', minHeight: 300 }}>
								<Image
									alt="MacBook Pro laptop showing Circulate member reporting tool features"
									src="/other/macbook.png"
									fill
									size="100vw"
									style={{
										zIndex: 200,
										objectFit: 'contain',
									}}
								/>
							</Box>
						</Stack>
					</Grid>
					<Grid
						item
						xs={12}
						smxs={10}
						md={5.5}
						sx={{
							mx: 1.5,
							boxShadow: '0px 4px 8px rgba(144, 171, 169, 0.2)',
							borderRadius: '5px',
							background: 'white',
						}}>
						<SignupLoginTabs />
					</Grid>
				</Grid>
			</Container>
		</>
	);
}
