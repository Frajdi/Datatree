import * as React from 'react';
import { useState } from 'react';

import {
  DataGridPro,
  useGridApiContext,
  useGridSelector,
  gridFilteredDescendantCountLookupSelector,
  gridDetailPanelExpandedRowsContentCacheSelector,
  GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
} from '@mui/x-data-grid-pro';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import BasicTable from './BasicTable';


export const isNavigationKey = (key) =>
  key === 'Home' ||
  key === 'End' ||
  key.indexOf('Arrow') === 0 ||
  key.indexOf('Page') === 0 ||
  key === ' ';

  const CustomGridTreeDataGroupingCell = (props) => {
    const { id, field, rowNode } = props;
  
    const [isExpanded, setIsExpanded] = useState(false);
  
    const apiRef = useGridApiContext();
  
    const filteredDescendantCountLookup = useGridSelector(
      apiRef,
      gridFilteredDescendantCountLookupSelector
    );
  
    const filteredDescendantCount =
      filteredDescendantCountLookup[rowNode.id] ?? 0;
  
    const handleClick = (event) => {
      if (rowNode.type !== "group") {
        return;
      }
  
      apiRef.current.setRowChildrenExpansion(id, !rowNode.childrenExpanded);
      apiRef.current.setCellFocus(id, field);
      setIsExpanded((prev) => !prev);
    };
  
    return (
      <div>
        {filteredDescendantCount > 0 ? (
          <Button
            disableRipple={true}
            onClick={handleClick}
            sx={{color: 'black'}}
            tabIndex={-1}
            size="small"
            startIcon={
              <ExpandMoreIcon
                sx={{
                  transform: `rotateZ(${isExpanded ? 0 : -90}deg)`,
                  transition: (theme) =>
                    theme.transitions.create("transform", {
                      duration: theme.transitions.duration.shortest,
                    }),
                }}
                fontSize="inherit"
              />
            }
          >
            Order {filteredDescendantCount}
          </Button>
        ) : (
          <span />
        )}
      </div>
    );
  };
  

export function CustomDetailPanelToggle(props) {
  const { id, value: isExpanded } = props;
  const apiRef = useGridApiContext();

  // To avoid calling ´getDetailPanelContent` all the time, the following selector
  // gives an object with the detail panel content for each row id.
  const contentCache = useGridSelector(
    apiRef,
    gridDetailPanelExpandedRowsContentCacheSelector,
  );

  // If the value is not a valid React element, it means that the row has no detail panel.
  const hasDetail = React.isValidElement(contentCache[id]);

  if(!hasDetail) return

  return (
    <IconButton
      size="small"
      tabIndex={-1}
      disabled={!hasDetail}
      aria-label={isExpanded ? 'Close' : 'Open'}
    >
      <ExpandMoreIcon
        sx={{
          transform: `rotateZ(${isExpanded ? 0 : -90}deg)`,
          transition: (theme) =>
            theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        }}
        fontSize="inherit"
      />
    </IconButton>
  );
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
  },
  {
    ...GRID_DETAIL_PANEL_TOGGLE_COL_DEF,
    renderCell: (params) => (
      <CustomDetailPanelToggle id={params.id} value={params.value} />
    ),
  },

];

const getTreeDataPath = (row) => row.hierarchy;

const groupingColDef = {
  headerName: 'Document Type',
  renderCell: (params) => <CustomGridTreeDataGroupingCell {...params} />,
};

export const TreeDataCustomGroupingColumn = () => {
  return (
    <Stack justifyContent='center' alignItems='center' style={{ height: '50%', width: '100%' }}>
      <DataGridPro
        treeData
        rows={rows}
        columns={columns}
        getTreeDataPath={getTreeDataPath}
        groupingColDef={groupingColDef}
        getDetailPanelContent={({row}) => {
          if(row.hierarchy.length > 1) return <BasicTable />
        }}
        getDetailPanelHeight={({ row }) => 'auto'}
      />
    </Stack>
  );
}
