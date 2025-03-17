import { 
  Box, 
  Typography,
  Select,
  MenuItem,
  Modal 
} from '@mui/material';
import { Button } from '@mui/base';
import { useTheme, styled } from '@mui/material/styles';
import { BudgetType, TransactionType } from '@src/types';
import { PieChart, Pie, Cell } from 'recharts';
import format_number from '@src/utils/format_number';
import { Budget } from '@components';

const Budgets = ({ data, data_transactions } : { data : BudgetType[], data_transactions : TransactionType[] }) => {
  const theme = useTheme();

  const flexColumn = {
    display: 'flex',
    flexDirection: 'column',
  }

  const flexRow = {
    display: 'flex',
    flexDirection: 'row'
  }

  const textColor = {
    color: theme.palette.grey.main
  }

  const CustomButton = styled(Button)(
    () => (
      {
        backgroundColor: '#000',
        color: theme.palette.primary.main,
        borderRadius: '8px',
        padding: '16px',
        border: 'none',
        transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        ':hover': {
          cursor: 'pointer',
          backgroundColor: theme.palette.grey.main,
          boxShadow: `2px 2px ${theme.palette.grey.light}`
        }
      }
    )
  )

  return (
    <Box sx={{ ...flexColumn, gap: '32px', height: '100%' }}>
      <Box sx={{...flexRow, justifyContent: 'space-between', alignItems: 'center'}}>
        <Typography variant="h1">Budgets</Typography>
        <CustomButton>
          <Typography variant="h4">+ Add New Budget</Typography>
        </CustomButton>
      </Box>
      <Box sx={{...flexRow, gap: '24px'}}>
        <Box sx={{...flexColumn, backgroundColor: theme.palette.primary.main, borderRadius: '12px', padding: '32px', gap: '32px', width: '35%', alignItems: 'center'}}>
          <PieChart width={240} height={240}>
            <Pie
              data={data}
              dataKey="maximum"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={85}
              outerRadius={120}
              stroke='none'
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.theme} />
              ))}
            </Pie>
            <Pie 
              data={data}
              dataKey="maximum"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={85}
              stroke='none'
            >
              {data.map((entry, index) => (
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
          <Box sx={{...flexColumn, gap: '24px', width: '100%'}}>
            <Typography variant="h2">Spending Summary</Typography>
            <Box>
              {data.map((budget, index) => (
                <Box 
                  key={index} 
                  sx={{
                    ...flexRow, 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: index < data.length - 1 ? `1px solid ${theme.palette.primary.light}` : 'none'
                  }}
                >
                  <Box sx={{...flexRow, gap: '16px'}}>
                    <Box sx={{width: '4px', backgroundColor: budget.theme, borderRadius: '8px'}} />
                    <Typography variant="body1" sx={textColor}>{budget.category}</Typography>
                  </Box>
                  <Box sx={{...flexRow, gap: '10px', alignItems: 'center'}}>
                    <Typography variant='h3'>{format_number(15)}</Typography>
                    <Typography variant="body1" sx={textColor}>of {format_number(budget.maximum)}</Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{...flexColumn, flex: 1, gap: '24px'}}>
          {data.map((data_budget, index) => 
            <Budget budget={data_budget} transactions={data_transactions} key={index} />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Budgets
