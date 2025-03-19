import { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Avatar,
  Select, 
  MenuItem,
  InputAdornment, 
  OutlinedInput, 
  FormControl, 
  Pagination,
  PaginationItem
} from '@mui/material';
import { TransactionType } from '@src/types';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import { useTheme } from '@mui/material/styles';
import format_number from '@src/utils/format_number';
import jsonData from '../../../../../data.json';


const Transactions = ({ data } : { data: TransactionType[] }) => {
  const ROW_HEIGHT = 80;
  const sortSelection = ["Latest", "Oldest", "A to Z", "Z to A", "Highest", "Lowest"]
  const categorySelection = jsonData.categories
  const apiRef = useGridApiRef();
  const containerRef = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const [ page, setPage ] = useState(0);
  const [ paginatedRows, setPaginatedRows ] = useState<TransactionType[]>(data);
  const [ pageSize, setPageSize ] = useState(5);
  const [ displayData, setDisplayData ] = useState<TransactionType[]>(data);
  const [ search, setSearch ] = useState<string>("");
  const [ sort, setSort ] = useState(sortSelection[0])
  const [ category, setCategory ] = useState(categorySelection[0])

  const containerStyle = {
    backgroundColor: "transparent",
    maxHeight: '100%',
    border: 'none',
    '& .MuiDataGrid-columnHeaderTitle': {
      color: theme.palette.grey.main,
      fontSize: '12px',
      lineHeight: '150%',
      paddingLeft: '16px',
    },
    "& .MuiDataGrid-columnSeparator": {
      display: "none",
    }
  }

  const customButtonStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
    padding: '10px 24px',
    borderRadius: '8px',
    color: theme.palette.grey.main,
    border: `1px solid ${theme.palette.grey.light}`,
    ':hover': {
      backgroundColor: theme.palette.grey.contrastText,
      cursor: 'pointer',
      transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
    }
  }

  const focusStyle = {
    padding: '0 15px',
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey.dark,
        borderWidth: '1px',
    }},
  }

  const textColor = {
    color: theme.palette.grey.main
  }

  const sortField = {
    display: 'flex', 
    flexDirection: 'row', 
    gap: '20px', 
    alignItems: 'center'
  }

  const menuStyle = {
    overflowY: 'auto',
    maxHeight: '250px',
    borderRadius: '8px',
    padding: '0px 15px',
    display: 'flex',
    flexDirection: 'column',
    scrollbarWidth: 'none',
    marginTop: theme.spacing(2),
    transition: 'all 1s ease-in-out',
    '&.MuiMenu-paper': {
      opacity: 0,
      transform: 'translateY(-10px)',
    },
      '&[aria-hidden="false"]': {
        opacity: 1,
        transform: 'translateY(0)',
      },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }

  const columns = [
    {
      field: 'name',
      headerName: 'Recipient / Sender',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', height: '100%' }}>
            <Avatar src={params.row.avatar} alt={params.row.name} />
            <Typography variant="h4">{params.row.name}</Typography>
          </Box>
        )
      }
    },
    {
      field: 'category',
      headerName: 'Category',
      width: 280,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ paddingLeft: '16px', height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ color: theme.palette.grey.main }}>{params.row.category}</Typography>
        </Box>
      )
    },
    {
      field: 'date',
      headerName: 'Transaction Date',
      width: 400,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ paddingLeft: '16px', height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography variant='body2' sx={{ color: theme.palette.grey.main }}>{new Date(params.value).toLocaleDateString()}</Typography>
        </Box>
      )
    },
    {
      field: 'amount',
      headerName: 'Amount',
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <Box sx={{ paddingLeft: '16px', height: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography sx={{ color: params.value < 0 ? theme.palette.error.main : theme.palette.success.main, fontWeight: 'bold' }}>
            {params.value < 0 ? `${format_number(params.value)}` : `+${format_number(params.value)}`}
          </Typography>
        </Box>
      )
    }
  ]

  const CustomPrev = () => (
    <Box sx={customButtonStyle} onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
      <img src="/images/icon-caret-left.svg" alt="prev" />
      <Typography variant='body1'>Prev</Typography>
    </Box>
  )

  const CustomNext = () => (
    <Box sx={customButtonStyle} onClick={() => setPage((prev) => Math.min(prev + 1, Math.ceil(data.length / pageSize) - 1))}>
      <Typography variant='body1'>Next</Typography>
      <img src="/images/icon-caret-right.svg" alt="next" />
    </Box>
  )

  const handleChangeSort = (e) => {
    setSort(e.target.value)
  }

  const handleChangeCategory = (e) => {
    setCategory(e.target.value)
  }

  useEffect(() => {
    setPaginatedRows(displayData.slice(page * pageSize, (page + 1) * pageSize));
  }, [page, pageSize, displayData]);

  useEffect(() => {
    const updatePageSize = () => {
      if (containerRef.current) {
        const containerHeight = containerRef.current.clientHeight;
        const calculatedPageSize = Math.floor(containerHeight / ROW_HEIGHT);
        setPageSize(calculatedPageSize > 0 ? calculatedPageSize : 1);
      }
    };

    updatePageSize();
    window.addEventListener('resize', updatePageSize);

    return () => window.removeEventListener('resize', updatePageSize);
  }, [page, data]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '32px', height: '100%' }}>
      <Typography variant="h1">Transactions</Typography>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%', 
        backgroundColor: theme.palette.primary.main, 
        borderRadius: '12px', 
        padding: '32px', 
        gap: '32px' 
      }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <FormControl variant="outlined" sx={{ width: '30%' }}>
            <OutlinedInput
              id="outlined-adornment-weight"
              endAdornment={
                <InputAdornment position="end">
                  <img src="/images/icon-search.svg" alt="" />
                </InputAdornment>
              }
              sx={focusStyle}
            />
          </FormControl>
          <Box sx={{display: 'flex', flexDirection: 'row', gap: '60px'}}>
            <Box sx={sortField}>
              <Typography variant="body1" sx={textColor}>Sort by</Typography>
              <FormControl>
                <Select
                  id="demo-simple-select-helper"
                  value={sort}
                  onChange={handleChangeSort}
                  sx={{...focusStyle, minWidth: '120px'}}
                  MenuProps={{
                    PaperProps: {
                      style: menuStyle
                    }
                  }}
                >
                  {sortSelection.map((sort_item, index) => (
                    <MenuItem 
                      value={sort_item} 
                      key={index} 
                      sx={{
                        borderBottom: index < categorySelection.length - 1 ? `1px solid ${theme.palette.primary.light}` : 'none', // Add border-bottom except for the last item
                        padding: '10px 20px',
                        fontWeight: sort == sort_item ? "bold" : "normal"
                      }}
                    >
                      {sort_item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={sortField}>
              <Typography variant="body1" sx={textColor}>Category</Typography>
              <FormControl>
                <Select
                  id="demo-simple-select-helper"
                  value={category}
                  onChange={handleChangeCategory}
                  sx={{...focusStyle, minWidth: '200px'}}
                  MenuProps={{
                    PaperProps: {
                      style: menuStyle
                    }
                  }}
                >
                  {categorySelection.map((category_item, index) => (
                    <MenuItem 
                      value={category_item} 
                      key={index}
                      sx={{
                        borderBottom: index < categorySelection.length - 1 ? `1px solid ${theme.palette.primary.light}` : 'none', // Add border-bottom except for the last item
                        padding: '10px 20px',
                        fontWeight: category == category_item ? "bold" : "normal"
                      }}
                    >
                      {category_item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box ref={containerRef} id="data-grid-container" sx={{ flex: 1 }}>
          <DataGrid
            apiRef={apiRef}
            columns={columns}
            rows={paginatedRows}
            getRowId={(row) => `${row.date}-${row.name}`}
            getRowHeight={() => ROW_HEIGHT}
            sx={containerStyle}
            hideFooterPagination
            hideFooter
            disableVirtualization
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <CustomPrev />
          <Pagination
            count={Math.ceil(data.length / pageSize)}
            page={page + 1}
            onChange={(e, newPage) => setPage(newPage - 1)}
            variant="outlined"
            shape="rounded"
            size="large"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              '& .MuiPagination-ul': {
                display: 'flex',
                gap: '8px',
              },
              '& .Mui-selected': {
                backgroundColor: '#000 !important',
                color: '#fff',
                transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
              }
            }}
            renderItem={(item) => item.type !== "previous" && item.type !== "next" && 
              <PaginationItem {...item} 
                sx={{
                  ':hover': {
                    backgroundColor: '#000',
                    color: '#fff',
                    transition: 'color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
                  }
                }} 
              /> }
          />
          <CustomNext />
        </Box>
      </Box>
    </Box>
  );
};

export default Transactions;
