import Typography from '@mui/material/Typography';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';

export default function Crumb({ text, href, last }) {
	return (
		<>
			{!last && (
				<Link href={href} passHref legacyBehavior>
					<MuiLink
						underline="hover"
						color="inherit"
						sx={{ fontSize: '0.875rem' }}>
						{text}
					</MuiLink>
				</Link>
			)}
			{last && (
				<Typography
					sx={{
						color: 'primary.main',
						fontSize: '0.875rem',
						fontWeight: 500,
					}}>
					{text}
				</Typography>
			)}
		</>
	);
}
