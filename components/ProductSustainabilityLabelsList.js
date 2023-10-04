import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import {
	List,
	ListItem,
	ListItemText,
	ListItemAvatar,
	Typography,
} from '@mui/material';
import staticSustainabilityLabels from '../../static/staticSustainabilityLabels.json';
import LabelImage from './LabelImage';
import { getVariantLabels } from '../../functions/products/variants';

export default function ProductSustainabilityLabelsList({
	variant,
	criteria,
	labelInFocus,
}) {
	const [style, setStyle] = useState('border--inactive');
	const intl = useIntl();
	const sustainabilityLabels = staticSustainabilityLabels;
	let labels = getVariantLabels(variant, criteria, sustainabilityLabels);

	useEffect(() => {
		if (labelInFocus) {
			setStyle('border--active');
			setTimeout(function () {
				setStyle('border--inactive');
			}, 3000);
		}
	}, [setStyle, labelInFocus]);

	return (
		<>
			<List
				sx={{ display: 'flex', flexWrap: 'wrap' }}
				role="presentation">
				{labels?.map((label) => (
					<ListItem
						className={
							labelInFocus === label.title
								? style
								: 'border--inactive'
						}
						key={label.title}
						alignItems="flex-start"
						sx={{
							maxWidth: '50%',
						}}>
						<ListItemAvatar sx={{ mr: 2, mt: 1.2 }}>
							<LabelImage
								key={label.title}
								title={label.title}
								src={label.src}
								alt={label.alt}
								value={label.title}
							/>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography
									variant="body2"
									fontWeight={400}
									color="text.primary">
									{label.title}
								</Typography>
							}
							secondary={
								<Typography
									variant="body3"
									color="text.secondary">
									{intl.formatMessage({
										id: label.description,
									})}
								</Typography>
							}
						/>
					</ListItem>
				))}
			</List>
		</>
	);
}
