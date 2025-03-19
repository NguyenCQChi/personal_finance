import { TransactionType } from "@src/types";
import { Box, Typography, Avatar, Paper } from '@mui/material';
import format_number from "@src/utils/format_number";
import format_date from "@src/utils/format_date";
import { useTheme } from '@mui/material/styles';

interface ItemType {
  transaction: TransactionType,
  overview?: boolean,
  bgColor?: string
}

const Transaction = ({ transaction, overview=true, bgColor="" } : ItemType) => {
  const theme = useTheme();

  const flexRow = {
    display: 'flex',
    flexDirection: 'row'
  }

  const flexColumn = {
    display: 'flex',
    flexDirection: 'column'
  }

  const container = {
    boxShadow: 'none', 
    justifyContent: 'space-between'
  }

  const textColor = {
    color: theme.palette.grey.main
  }

  return (
    <Paper sx={{...flexRow, ...container, backgroundColor: bgColor }}>
      <Box sx={{...flexRow, gap: '16px', alignItems: 'center'}}>
        <Avatar alt={transaction.name} src={transaction.avatar} />
        <Typography variant="h4">{transaction.name}</Typography>
      </Box>
      {overview ? (
        <Box sx={{...flexColumn, gap: '8px', alignItems: 'end'}}>
          {transaction.amount < 0 ? (
            <Typography variant="h4">{format_number(transaction.amount)}</Typography>
          ) : (
            <Typography variant="h4" sx={{color: theme.palette.green.main}}>+{format_number(transaction.amount)}</Typography>
          )}
            <Typography variant="body1" sx={{color: textColor}}>{format_date(transaction.date)}</Typography>
        </Box>
      ) : (
        <Box sx={{...flexColumn, gap: '8px', alignItems: 'end'}}>
          <Typography variant="h4">{format_number(transaction.amount)}</Typography>
          <Typography variant="body1" sx={{color: textColor}}>{format_date(transaction.date)}</Typography>
        </Box>
      )}
    </Paper>
  )
}

export default Transaction