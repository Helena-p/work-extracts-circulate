import React from 'react';
import { FormattedMessage, FormattedDate, FormattedNumber } from 'react-intl';
import Link from 'next/link';
import { TableCell, TableRow, Typography } from '@mui/material';
import { ItemCount } from '../../orders/ItemCount';
import { OrderItemsSummary } from '../../orders/OrderItemsSummary';

export default function OrderRow({ order }) {
	return (
		<TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
			<TableCell component="th" scope="row">
				<Link href={`/dashboard/orders/${order.number}`}>
					#{order.number}
				</Link>
			</TableCell>
			<TableCell align="left">
				<ItemCount order={order} />
				<br></br>
				<OrderItemsSummary order={order} />
			</TableCell>
			<TableCell align="right">
				<Typography variant="numeric">
					<FormattedNumber
						value={order.sub_total}
						style="currency"
						currency={order.currency}
					/>
				</Typography>
			</TableCell>
			<TableCell align="right">
				<FormattedDate
					value={order.date_created}
					year="numeric"
					month="short"
					day="numeric"
				/>
			</TableCell>
		</TableRow>
	);
}
