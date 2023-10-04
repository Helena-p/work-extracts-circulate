import { useIntl } from 'react-intl';
import Image from 'next/image';

export default function LabelImage({
	title,
	src,
	alt,
	onLabelClick,
	styles,
	scaleOnHover = false,
}) {
	const intl = useIntl();
	const hasOnclick = typeof onLabelClick === 'function';
	const defaultStyles = {
		maxWidth: '100%',
		height: 'auto',
		objectFit: 'contain',
		cursor: hasOnclick ? 'pointer' : 'default',
	};
	return (
		<Image
			className={scaleOnHover ? 'scaleOnHover' : ''}
			key={title}
			src={src}
			alt={alt ? intl.formatMessage({ id: alt }) : ''}
			value={title}
			width={50}
			height={50}
			style={styles ? styles : defaultStyles}
			onClick={hasOnclick ? (e) => onLabelClick(e, title) : undefined}
		/>
	);
}
