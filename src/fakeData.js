export const dataTreeRows = [
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
]

export const dataTreeColumns =  [
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

]


