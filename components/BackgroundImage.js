import React from 'react';
import { Box, useMediaQuery } from '@mui/material';
import Image from 'next/image';

export default function BackgroundImage({
	imageSrcDesktop = '/no_img.png',
	imageSrcMobile = imageSrcDesktop,
	imageSrcTablet = imageSrcDesktop,
	breakpointMobile = 600,
	breakpointTablet = 900,
	breakpointDesktop = breakpointTablet ? 1024 : 601,
	radius = 0,
	zIndex = 0,
	object = 'cover',
}) {
	const showMobile = useMediaQuery(`(max-width: ${breakpointMobile}px) `);
	const showTablet = useMediaQuery(`(max-width: ${breakpointTablet}px) `);
	const showDesktop = useMediaQuery(`(min-width: ${breakpointDesktop}px)`);

	const styles = {
		bgImage: {
			position: 'absolute',
			top: 0,
			zIndex: zIndex,
			width: '100%',
			height: '100%',
		},
	};

	const imageSrc = showMobile
		? imageSrcMobile
		: showTablet
		? imageSrcTablet
		: imageSrcDesktop;

	return (
		<Box style={styles.bgImage}>
			<Image
				src={imageSrc}
				alt=""
				priority
				fill
				sizes="100vw"
				style={{ objectFit: object, borderRadius: radius }}
			/>
		</Box>
	);
}
