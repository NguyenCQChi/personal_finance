import { useState, useEffect } from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import { DataType } from '@src/types';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useTheme, styled } from '@mui/material/styles';
import format_number from '@src/utils/format_number';

const Transactions = ({ data } : { data: DataType }) => {
  const apiRef = useGridApiRef();
  const theme = useTheme();
  const [ pageSize, setPageSize ] = useState(5);

  const getRowHeight = (params) => {
    return 80;
  }

  const mainContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    height: '100%'
  }

  const transactionContainer = {
    backgroundColor: "transparent",
    maxHeight: '100%',
    border: 'none',
    '& .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.grey.main,
      fontSize: '12px',
      lineHeight: '150%',
      paddingLeft: '16px'
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none"
    }
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Recipient / Sender',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', height: '100%'}}>
          <Avatar src={params.row.avatar} alt={params.row.name}/>
          <Typography variant="h4">{params.row.name}</Typography>
        </Box>
      )
    },
    {
      field: 'category',
      headerName: 'Category',
      width: '280',
      sortable: false,
      renderCell: (params) => (
        <Box sx={{paddingLeft: '16px', height: '100%', alignContent: 'center'}}>
          <Typography variant='body2' sx={{color: theme.palette.grey.main}}>{params.row.category}</Typography>
        </Box>
      )
    },
    {
      field: 'date',
      headerName: 'Transaction Date',
      width: '400',
      sortable: false,
      renderCell: (params) => (
        <Box sx={{paddingLeft: '16px', height: '100%', alignContent: 'center'}}>
          <Typography variant='body2' sx={{color: theme.palette.grey.main}}>{new Date(params.value).toLocaleDateString()}</Typography>
        </Box>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: '200',
      sortable: false,
      renderCell: (params) => (
        <Box sx={{paddingLeft: '16px', height: '100%', alignContent: 'center'}}>
          <Typography sx={{ color: params.value < 0 ? theme.palette.red.main : theme.palette.green.main, fontWeight: 'bold' }}>
            {params.value < 0 ? `${format_number(params.value)}` : `+${format_number(params.value)}`}
          </Typography>
        </Box>
      ),
    }
  ]

  useEffect(() => {
    const updatePageSize = () => {
      const containerHeight = document.getElementById("data-grid-container")?.clientHeight || 600;
      const rowHeight = getRowHeight(0);
      const calculatePageSize = Math.floor(containerHeight / rowHeight);

      setPageSize(calculatePageSize);
    }

    updatePageSize();
    window.addEventListener("resize", updatePageSize);

    return () => window.removeEventListener("resize", updatePageSize)
  }, [])

  return (
    <Box sx={mainContainer}>
      <Typography variant="h1">Transactions</Typography>
      <Box id="data-grid-container" sx={{height: '100%', backgroundColor: theme.palette.primary.main, borderRadius: '12px', overflow: 'hidden'}}>
        <DataGrid 
          apiRef={apiRef}
          columns={columns}
          rows={data}
          getRowId={(row) => row.date}
          getRowHeight={getRowHeight}
          pageSize={pageSize}
          pagination
          sx={transactionContainer}
        />
      </Box>
    </Box>
  )
}

export default Transactions;