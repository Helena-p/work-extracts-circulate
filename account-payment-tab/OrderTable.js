import React from 'react';
import { FormattedMessage } from 'react-intl';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import OrderRow from './OrderRow';

export default function OrderTable({ orderList }) {
	return (
		<TableContainer sx={{ py: 3, px: 2 }}>
			<Table>
				<TableHead
					fontWeight={200}
					sx={{
						'& .MuiTableCell-head': { color: 'text.secondary' },
					}}>
					<TableRow>
						<TableCell>
							<FormattedMessage id="Order.Label.Order" />
						</TableCell>
						<TableCell>
							<FormattedMessage id="Order.Label.OrderContent" />
						</TableCell>
						<TableCell align="right">
							<FormattedMessage id="Order.Label.OrderValue" />
						</TableCell>
						<TableCell align="right">
							<FormattedMessage id="Order.Label.OrderDate" />
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{orderList?.results?.map((order) => (
						<OrderRow key={order.id} order={order} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
