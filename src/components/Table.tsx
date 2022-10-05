import { orderType, rowType } from '../types';
import { FC, useEffect, useMemo, useState } from 'react';
import { getOrders } from '../utils/api';
import {
  TableContainer,
  TableHead,
  TableRow,
  Table as MuiTable,
  TableCell,
  TableBody,
  TableSortLabel,
} from '@mui/material';

const Table: FC = () => {
  const [orders, setOrders] = useState<orderType[]>([]);
  const [direction, setDirection] = useState<'asc' | 'desc'>('desc');

  const rows = useMemo(() => {
    return orders
      .reduce((acc: rowType[], order, index, orders) => {
        if (acc.find(({ docName }) => docName === order.docName)) return acc;

        const ordersCount = orders.filter(
          ({ docName }) => docName === order.docName
        ).length;

        acc.push({ docName: order.docName, ordersCount });

        return acc;
      }, [])
      .sort((a, b) => (a.ordersCount < b.ordersCount ? 1 : -1));
  }, [orders]);

  const handleSort = () => {
    if (direction === 'asc') {
      rows.sort((a, b) => (a.ordersCount < b.ordersCount ? 1 : -1));
      setDirection('desc');
    } else {
      rows.sort((a, b) => (a.ordersCount > b.ordersCount ? 1 : -1));
      setDirection('asc');
    }
  };

  useEffect(() => {
    getOrders().then((res) => {
      setOrders(res);
    });
  }, []);

  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell>Наименование документа</TableCell>
            <TableCell>
              <TableSortLabel active direction={direction} onClick={handleSort}>
                Количество заявок
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(({ docName, ordersCount }) => (
            <TableRow key={docName}>
              <TableCell component="th">{docName}</TableCell>
              <TableCell>{ordersCount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export default Table;
