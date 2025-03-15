import { useEffect, useState } from 'react';
import { Box, Typography, Stack, Divider, Paper, Avatar } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme, styled } from '@mui/material/styles';
import format_number from '@src/utils/format_number';
import format_date from '@src/utils/format_date';
import { Button } from '@mui/base';
import CustomIcon from '@src/utils/CustomIcon';
import { DataType } from '@src/types';
import { PieChart, Pie, Cell } from 'recharts';

const Overview = ({ data } : { data : DataType }) => {
  const theme = useTheme();
  const pot_data = data.pots;
  const transaction_data = data.transactions;
  const budget_data = data.budgets;
  const [ totalSaving, setTotalSaving ] = useState(0);
  const [ shortenPot, setShortenPot ] = useState(pot_data);
  const [ shortenTransaction, setShortenTransaction ] = useState(transaction_data);
  const [ shortenBudgets, setShortenBudgets ] = useState(budget_data); 

  const mainContainer = {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    height: '100%',
  }

  const gridStyle = {
    backgroundColor: theme.palette.primary.main,
    height: 'fit-content',
    borderRadius: '12px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  }

  const flexBox = {
    display: 'flex',
    flexDirection: 'column', 
    gap: '24px'
  }

  const smallBox = {
    display: 'flex', 
    flexDirection: 'column', 
    gap: '20px',
    padding: '32px',
    borderRadius: '12px',
    backgroundColor: theme.palette.primary.main
  }

  const headerStyle = {
    display: 'flex', 
    flexDirection: 'row',
    justifyContent: 'space-between'
  }

  const CustomButton = styled(Button)(() => (
    {
      backgroundColor: 'transparent',
      border: 'none',
      display: 'flex',
      flexDirection: 'row',
      fontSize: '14px',
      color: theme.palette.grey.main, 
      gap: '20px',
      ':hover': {
        cursor: 'pointer',
        color: theme.palette.grey.dark,
        transition: '0.3s ease',
        textDecoration: 'underline',
      }
    }
  ))

  const potItemStyle = {
    display: 'flex',
    flexDirection: 'row',
    gap: '16px',
  }

  const recurringItem = {
    backgroundColor: theme.palette.primary.light,
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'row',
    padding: '0px 16px',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  useEffect(() => {
    const total = pot_data.reduce((acc, item) => acc + item.total, 0);
    setTotalSaving(total);
    if (pot_data.length > 4) {
      setShortenPot(pot_data.slice(0, 4))
    }
    if (transaction_data.length > 4) {
      setShortenTransaction(transaction_data.slice(0, 4))
    }
    if(budget_data.length > 4) {
      budget_data.sort((a, b) => b.maximum - a.maximum)
      setShortenBudgets(budget_data.slice(0, 4))
    }
  }, [])
  
  return (
    <Box sx={mainContainer}>
      <Typography variant="h1">Overview</Typography>
      {/* Overview Section */}
      <Grid container spacing={6} columns={12}>
        <Grid size={4} sx={{...gridStyle, backgroundColor: '#000'}}>
          <Typography variant="body1" sx={{color: theme.palette.primary.main}}>Current Balance</Typography>
          <Typography variant="h1" sx={{color: theme.palette.primary.main}}>{format_number(data.balance.current)}</Typography>
        </Grid>
        <Grid size={4} sx={gridStyle}>
          <Typography variant="body1" sx={{color: theme.palette.grey.main}}>Income</Typography>
          <Typography variant="h1">{format_number(data.balance.income)}</Typography>
        </Grid>
        <Grid size={4} sx={gridStyle}>
          <Typography variant="body1" sx={{color: theme.palette.grey.main}}>Expenses</Typography>
          <Typography variant="h1">{format_number(data.balance.expenses)}</Typography>
        </Grid>
      </Grid>
      {/* Main section */}
      <Box sx={{display: 'flex', flexDirection: 'row', gap: '24px', flex: 1, minHeight: 0}}>
        {/* Left section */}
        <Box sx={{...flexBox, width: '60%'}}>
          {/* Pot section */}
          <Box sx={{...smallBox}}>
            <Box sx={headerStyle}>
              <Typography variant="h2">Pots</Typography>
              <CustomButton>
                See Details
                <CustomIcon src="/images/icon-caret-right.svg" />
              </CustomButton>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '20px'}}>
              <Box sx={{display: 'flex', flexDirection: 'row', padding: '16px', gap: '16px', alignItems: 'center', backgroundColor: theme.palette.primary.light, borderRadius: '12px', width: '40%'}}>
                <img src="/images/icon-pot.svg" alt="icon" />
                <Box sx={{display: 'flex', flexDirection: 'column', gap: '11px'}}>
                  <Typography variant="body1" sx={{color: theme.palette.grey.main}}>Total Saved</Typography>
                  <Typography variant='h1'>{format_number(totalSaving)}</Typography>
                </Box>  
              </Box>
              <Grid container spacing={4} sx={{flex: 1}}>
                {shortenPot.map((pot, index) => {
                  return (
                    <Grid size={6} sx={potItemStyle} key={index}>
                      <Box sx={{width: '4px', height: '100%', backgroundColor: pot.theme, borderRadius: '8px'}} />
                      <Box sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                        <Typography variant="body2" sx={{color: theme.palette.grey.main}}>{pot.name}</Typography>
                        <Typography variant='h4'> {format_number(pot.total)} </Typography>
                      </Box>
                    </Grid>
                  )
                })}
              </Grid>
            </Box>
          </Box>
          {/* Transactions section */}
          <Box sx={{...smallBox, flex: 1}}>
            <Box sx={headerStyle}>
              <Typography variant="h2">Transactions</Typography>
              <CustomButton>
                View All
                <CustomIcon src="/images/icon-caret-right.svg" />
              </CustomButton>
            </Box>
            <Stack 
              direction="column"
              divider={<Divider orientation='horizontal' flexItem />}
              spacing={5}
              sx={{justifyContent: 'space-between', flex: 1}}
            >
              {shortenTransaction.map((transaction, index) => {
                return (
                  <Paper key={index} sx={{display: 'flex', flexDirection: 'row', boxShadow: 'none', justifyContent: 'space-between'}}>
                    <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center'}}>
                      <Avatar alt={transaction.name} src={transaction.avatar} />
                      <Typography variant='h4'>{transaction.name}</Typography>
                    </Box>
                    <Box sx={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                      {transaction.amount < 0 ? (
                        <Typography variant="h4">{format_number(transaction.amount)}</Typography>
                      ) : (
                        <Typography variant="h4" sx={{color: theme.palette.green.main}}>+{format_number(transaction.amount)}</Typography>
                      )}
                      <Typography variant="body1">{format_date(transaction.date)}</Typography>
                    </Box>
                  </Paper>
                )
              })}  
            </Stack>
          </Box>
        </Box>
        {/* Right section */}
        <Box sx={{...flexBox, flex: 1}}>
          {/* Budget section */}
          <Box sx={{...smallBox}}>
            <Box sx={headerStyle}>
              <Typography variant="h2">Budgets</Typography>
              <CustomButton>
                See Details
                <CustomIcon src="/images/icon-caret-right.svg" />
              </CustomButton>
            </Box>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px', justifyContent: "space-evenly", alignItems: 'center'}}>
              <PieChart width={240} height={240}>
                <Pie
                  data={shortenBudgets}
                  dataKey="maximum"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={85}
                  outerRadius={120}
                  stroke='none'
                >
                  {shortenBudgets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.theme} />
                  ))}
                </Pie>
                <Pie 
                  data={shortenBudgets}
                  dataKey="maximum"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={85}
                  stroke='none'
                >
                  {shortenBudgets.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.theme+"cf"}/>
                  ))}
                </Pie>
                <text
                  x="50%"
                  y="50%"
                  textAnchor='middle'
                  dominantBaseline="middle"
                  fontSize="18"
                  fontWeight="bold"
                  fill='#333'
                >
                  338
                </text>
                {/* <Tooltip /> */}
              </PieChart>
              <Box sx={{display: 'flex', flexDirection: 'column', gap: '16px'}}>
                  {shortenBudgets.map((entry, index) => {
                    return (
                      <Box key={index} sx={{display: 'flex', flexDirection: 'row', gap: '16px'}}> 
                        <Box sx={{ width: '4px', backgroundColor: entry.theme, borderRadius: '8px'}} />
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
                          <Typography variant='body2'>{entry.category}</Typography>
                          <Typography variant='h4' sx={{color: theme.palette.grey.main}}>{format_number(entry.maximum)}</Typography>
                        </Box>
                      </Box>
                    )
                  })}
              </Box>
            </Box>
          </Box>
          {/* Recurring section */}
          <Box sx={{...smallBox, flex: 1}}>
            <Box sx={headerStyle}>
              <Typography variant="h2">Recurring Bills</Typography>  
              <CustomButton>
                See Details
                <CustomIcon src="/images/icon-caret-right.svg" />
              </CustomButton>
            </Box>
            <Grid container spacing={3} columns={12} sx={{height: '100%'}}>
              <Grid size={12} sx={{...recurringItem, boxShadow: `inset 4px 0 ${theme.palette.green.main}`}}>
                <Typography variant="body1" sx={{color: theme.palette.grey.main}}>Paid Bills</Typography>
                <Typography variant='h4'>$190.00</Typography>
              </Grid>
              <Grid size={12} sx={{...recurringItem, boxShadow: `inset 4px 0 ${theme.palette.yellow.main}`}}>
                <Typography variant="body1" sx={{color: theme.palette.grey.main}}>Total Upcoming</Typography>
                <Typography variant='h4'>$194.98</Typography>
              </Grid>
              <Grid size={12} sx={{...recurringItem, boxShadow: `inset 4px 0 ${theme.palette.cyan.main}`}}>
                <Typography variant="body1" sx={{color: theme.palette.grey.main}}>Due Soon</Typography>
                <Typography variant='h4'>$59.98</Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Overview