import React from 'react';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import {
	CardMedia,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';

function ProductSustainabilityImage({
	variant,
	isProduct = false,
	width = 88,
	height = 25,
}) {
	const intl = useIntl();

	let getSustainabilityImage = () => {
		if (!variant.attributes || !variant.attributes.sustainability_score) {
			return '/sustainability/score/sust-score-fallback.svg';
		}

		const sustainability_score = variant.attributes.sustainability_score;
		if (sustainability_score == '3') {
			return '/sustainability/score/sust-score3.svg';
		} else if (sustainability_score == '3.5') {
			return '/sustainability/score/sust-score3-5.svg';
		} else if (sustainability_score == '4') {
			return '/sustainability/score/sust-score4.svg';
		} else if (sustainability_score == '4.5') {
			return '/sustainability/score/sust-score4-5.svg';
		} else if (sustainability_score == '5') {
			return '/sustainability/score/sust-score5.svg';
		} else {
			return '/sustainability/score/sust-score-fallback.svg';
		}
	};

	let scores = [
		{
			src: '/sustainability/score/sust-score3.svg',
			text: 'Content.Sustainability.Score.3',
		},
		{
			src: '/sustainability/score/sust-score3-5.svg',
			text: 'Content.Sustainability.Score.3_5',
		},
		{
			src: '/sustainability/score/sust-score4.svg',
			text: 'Content.Sustainability.Score.4',
		},
		{
			src: '/sustainability/score/sust-score4-5.svg',
			text: 'Content.Sustainability.Score.4_5',
		},
		{
			src: '/sustainability/score/sust-score5.svg',
			text: 'Content.Sustainability.Score.Text5',
		},
	];

	let sustainabilityImage = getSustainabilityImage();

	const LightTooltip = styled(({ className, ...props }) => (
		<Tooltip {...props} classes={{ popper: className }} />
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.white,
			color: 'rgba(0, 0, 0, 0.87)',
			boxShadow: theme.shadows[1],
			fontSize: 14,
			padding: 20,
			maxWidth: 312,
			lineHeight: 1.8,
			border: '0.5px solid lightgrey',
		},
	}));

	let textContent = (
		<>
			<Typography variant="h5" component="h2" pb={2}>
				<FormattedMessage id="Product.Headline.SustScore" />
			</Typography>
			<Typography variant="body2" component="h3" pb="0.75rem">
				<FormattedMessage id="Content.Sustainability.Score.Descr" />
			</Typography>
			<List
				sx={{
					display: 'flex',
					flexDirection: 'column',
					gap: 0.5,
					pb: 0,
				}}>
				{scores.map((score) => (
					<ListItem key={score.src} sx={{ p: 0 }}>
						<ListItemIcon>
							<Image
								src={score.src}
								width={72}
								height={20}
								alt={intl.formatMessage({ id: score.text })}
								style={{
									maxWidth: '100%',
									objectFit: 'contain',
								}}
							/>
						</ListItemIcon>
						<ListItemText
							secondary={
								<Typography
									variant="h6"
									component="span"
									mb={0}
									ml={1}>
									{' '}
									<FormattedMessage id={score.text} />
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</>
	);

	return (
		<>
			<LightTooltip title={textContent}>
				{sustainabilityImage && (
					<CardMedia>
						<div>
							<Image
								src={sustainabilityImage}
								alt={intl.formatMessage({
									id: 'AltText.SustainabilityScore',
								})}
								width={width}
								height={height}
								style={{
									width: 'fit-content',
									objectFit: 'contain',
								}}
							/>
						</div>
					</CardMedia>
				)}
			</LightTooltip>
		</>
	);
}

export default React.memo(ProductSustainabilityImage);
