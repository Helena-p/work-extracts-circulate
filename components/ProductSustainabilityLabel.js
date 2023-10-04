import React, { useState } from 'react';
import Image from 'next/image';
import { useIntl } from 'react-intl';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { getVariantLabels } from '../../functions/products/variants';
import LabelImage from './LabelImage';
import staticSustainabilityLabels from '../../static/staticSustainabilityLabels.json';

export default function ProductSustainabilityLabels({
	variant,
	criteria,
	isMobile = false,
	inTooltip = false,
	onLabelClick,
	labelInFocus,
	setLabelInFocus,
}) {
	const intl = useIntl();
	const sustainabilityLabels = staticSustainabilityLabels;
	let labels = getVariantLabels(variant, criteria, sustainabilityLabels);

	const LightTooltip = styled(({ className, ...props }) => (
		<ClickAwayListener onClickAway={(e) => setLabelInFocus('')}>
			<Tooltip {...props} classes={{ popper: className }} />
		</ClickAwayListener>
	))(({ theme }) => ({
		[`& .${tooltipClasses.tooltip}`]: {
			backgroundColor: theme.palette.common.white,
			color: 'rgba(0, 0, 0, 0.87)',
			boxShadow: theme.shadows[1],
			fontSize: 12,
			maxWidth: 220,
			padding: 16,
			lineHeight: 1.8,
		},
	}));

	return (
		<>
			{labels?.map((label) =>
				inTooltip ? (
					<LightTooltip
						key={label.title}
						open={labelInFocus && labelInFocus === label.title}
						title={intl.formatMessage({ id: label.description })}
						disableFocusListener
						disableHoverListener
						disableTouchListener>
						<Image
							src={label.src}
							alt={
								label.alt
									? intl.formatMessage({ id: label.alt })
									: ''
							}
							value={label.title}
							width={50}
							height={50}
							style={{
								maxWidth: '100%',
								height: 'auto',
								objectFit: 'contain',
								outline:
									labelInFocus === label.title &&
									'2px solid #FDB600',
								borderRadius: '50%',
								outlineOffset: '6px',
							}}
							onClick={(e) => {
								setLabelInFocus(label.title);
							}}
						/>
					</LightTooltip>
				) : (
					<LabelImage
						key={label.title}
						title={label.title}
						src={isMobile ? label.imageSrcMobile : label.src}
						alt={label.alt}
						value={label.title}
						onLabelClick={onLabelClick}
					/>
				)
			)}
		</>
	);
}
