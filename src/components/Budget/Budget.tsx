import { useState } from 'react';
import { 
  Box,
  Typography,
  Modal
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/base';
import { useTheme, styled } from '@mui/material/styles';
import { BudgetType, TransactionType } from '@src/types';
import CustomIcon from '@src/utils/CustomIcon';
import format_number from '@src/utils/format_number';

const SPENDING = 30;

const Budget = ({ budget, transactions } : { budget : BudgetType, transactions : TransactionType[] }) => {
  const theme = useTheme();
  const ratio = SPENDING / budget.maximum * 100;
  console.log(ratio)
  const [ open, setOpen ] = useState(false);
  const handleOpen = () => {console.log("open") 
    setOpen(true)};
  const handleClose = () => setOpen(false);

  const flexColum = {
    display: 'flex',
    flexDirection: 'column'
  }

  const flexRow = {
    display: 'flex',
    flexDirection: 'row'
  }

  const textColor = {
    color: theme.palette.grey.main
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

  return (
    <Box sx={{...flexColum, gap: '20px', padding: '32px', backgroundColor: theme.palette.primary.main, borderRadius: '12px', width: '100%'}}>
      <Box sx={{...flexRow, justifyContent: 'space-between'}}>
        <Box sx={{...flexRow, gap: '16px', alignItems: 'center'}}>
          <Box sx={{borderRadius: '50%', width: '16px', height: '16px', backgroundColor: budget.theme}} />
          <Typography variant='h2'>{budget.category}</Typography>
        </Box>
        <CustomButton 
          sx={{
            ':hover': {
              cursor: 'pointer',
              transform: 'translateY(-2px) translateX(3px)',
              transition: 'ease-in-out 0.1s'
            }
          }}
          onClick={handleOpen}
        >
          <CustomIcon src="/images/icon-ellipsis.svg" id='budget_option' />
        </CustomButton>
      </Box>
      <Box sx={{...flexColum, gap: '16px'}}>
        <Typography variant='body2'>Maximum of {format_number(budget.maximum)}</Typography>
        <Box sx={{backgroundColor: theme.palette.primary.light, padding: '4px', width: '100%', height: '32px', borderRadius: '4px'}}>
          <Box sx={{backgroundColor: budget.theme, width: `${ratio}%`, borderRadius: '4px', height: '100%'}} />
        </Box>
        <Grid container columns={12} sx={{width: '100%'}}>
          <Grid size={6} sx={{...flexRow, gap: '16px'}}>
            <Box sx={{width: '4px', backgroundColor: budget.theme, borderRadius: '8px'}} />
            <Box sx={{...flexColum, gap: '4px'}}>
              <Typography variant='body2' sx={{textColor}}>Spent</Typography>
              <Typography variant='h4'>{format_number(SPENDING)}</Typography>
            </Box>
          </Grid>
          <Grid size={6} sx={{...flexRow, gap: '16px'}}>
            <Box sx={{width: '4px', backgroundColor: theme.palette.primary.light, borderRadius: '8px'}} />
            <Box sx={{...flexColum, gap: '4px'}}>
              <Typography variant='body2' sx={{textColor}}>Remaining</Typography>
              <Typography variant='h4'>{format_number(budget.maximum - SPENDING)}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{...flexColum, gap: '20px', padding: '20px', backgroundColor: theme.palette.primary.light, borderRadius: '12px'}}>
        <Box sx={{...flexRow, justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h3">Latest Spending</Typography>
          <Typography variant="body1">See All</Typography>
        </Box>
      </Box>

      {/* Modal needed */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={{backgroundColor: theme.palette.primary.main}}>Hello</Box>
      </Modal>
    </Box>
  )
}

export default Budget