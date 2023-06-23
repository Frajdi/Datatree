import * as React from 'react';
import {
  DataGridPro,
  useGridApiContext,
  useGridSelector,
  gridFilteredDescendantCountLookupSelector,
} from '@mui/x-data-grid-pro';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export const isNavigationKey = (key) =>
  key === 'Home' ||
  key === 'End' ||
  key.indexOf('Arrow') === 0 ||
  key.indexOf('Page') === 0 ||
  key === ' ';

const CustomGridTreeDataGroupingCell = (props) => {
  const { id, field, rowNode } = props;
  const apiRef = useGridApiContext();
  const filteredDescendantCountLookup = useGridSelector(
    apiRef,
    gridFilteredDescendantCountLookupSelector,
  );
  const filteredDescendantCount = filteredDescendantCountLookup[rowNode.id] ?? 0;

  const handleClick = (event) => {
    if (rowNode.type !== 'group') {
      return;
    }

    apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
    apiRef.current.setCellFocus(id, field);
    event.stopPropagation();
  };


  return (
    <Box sx={{ ml: rowNode.depth * 4 }}>
      <div>
        {filteredDescendantCount > 0 ? (
          <Button onClick={handleClick} tabIndex={-1} size="small">
            Order {filteredDescendantCount} 
          </Button>
        ) : (
          <span />
        )}
      </div>
    </Box>
  )
}


const rows = [
  {
    hierarchy: ['Order'],
    id: 0,
  },
  {
    hierarchy: ['Order', '1'],
    number: 'ORD - 23',
    date: new Date(),
    code: '2321-23423-234',
    publicInvoiceCode: '2321-23423-234',
    tenderIdentifyerCode: '2321-23423-234',
    linkedRowNumber: 3,
    productLines: 2,
    id: 1,
  },
  {
    hierarchy: ['Order', '2'],
    number: 'ORD - 23',
    date: new Date(),
    code: '2321-23423-234',
    publicInvoiceCode: '2321-23423-234',
    tenderIdentifyerCode: '2321-23423-234',
    linkedRowNumber: 3,
    productLines: 2,
    id: 2,
  },
];

const columns = [
  {
    field: 'number',
    headerName: 'Number',
  },
  { field: 'date', headerName: 'Date', width: 200 },
  {
    field: 'code',
    headerName: 'Code',
    width: 150,
  },
  {
    field: 'publicInvoiceCode',
    headerName: 'Public Inv. code', 
  },
  {
    field: 'tenderIdentifyerCode',
    headerName: 'Tender identif. code', 
  },
  {
    field: 'linkedRowNumber',
    headerName: 'Linked row nr.', 
  },
  {
    field: 'productLines',
    headerName: 'Product Lines'
  }

];

const getTreeDataPath = (row) => row.hierarchy;

const groupingColDef = {
  headerName: 'Document Type',
  renderCell: (params) => <CustomGridTreeDataGroupingCell {...params} />,
};

export const TreeDataCustomGroupingColumn = () => {
  return (
    <div style={{ height: '50%', width: '100%' }}>
      <DataGridPro
        treeData
        rows={rows}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        groupingColDef={groupingColDef}
        getDetailPanelContent={({row}) => {
          if(row.hierarchy.length > 1) return <div>Row ID: {row.id}</div>
        }}
        getDetailPanelHeight={({ row }) => 'auto'}
      />
    </div>
  );
}
