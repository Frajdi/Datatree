import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const createData = (
  name,
  calories,
  fat,
  carbs,
  protein,
) => {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('SKU: 00005 - Samsung 65" Q60B 4K QLED Smart TV (2022)'),
  createData('SKU: 24534 - iPhone 14 5G smartphone 128GB Midnight'),
  createData('SKU: 3323423 - Banana'),
];

export const BasicTable = () => {
  return (
    <Stack alignItems={'center'} justifyContent={'center'} padding={3}>
      <Table sx={{ maxWidth: 800, border: '1px solid #e0e0e0' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell><Typography variant='body2' color='#640074'>Product Lines</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}  
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  );
}

export default BasicTable;