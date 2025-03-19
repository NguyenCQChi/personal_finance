import { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Modal,
  Stack,
  Divider,
  Popover,
  MenuItem,
  Button
} from '@mui/material';
import { Transaction } from '@components';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import { BudgetType, TransactionType } from '@src/types';
import CustomIcon from '@src/utils/CustomIcon';
import format_number from '@src/utils/format_number';
import { EditBudgetModal, DeleteBudgetModal } from '../Modal';

const SPENDING = 30;

const Budget = ({ budget, transactions } : { budget : BudgetType, transactions : TransactionType[] }) => {
  const theme = useTheme();
  const ratio = SPENDING / budget.maximum * 100;
  
  const [ shortenTransaction, setShortenTransaction ] = useState<TransactionType[]>(transactions);
  // State and handling for menu dropdown
  const [ anchorEl, setAnchorEl ] = useState(null);
  
  const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => setAnchorEl(null)
  
  const openMenu = Boolean(anchorEl);
  const id = openMenu ? 'simple-popover' : undefined;

  // State and handling for modals
  const [ openEditBudgetModal, setOpenEditBudgetModal ] = useState(false);
  const [ openDeleteBudgetModal, setOpenDeleteBudgetModal ] = useState(false);

  const handleOpenEditBudgetModal = () => setOpenEditBudgetModal(true)
  const handleCloseEditBudgetModal = () => setOpenEditBudgetModal(false)

  const handleOpenDeleteBudgetModal = () => setOpenDeleteBudgetModal(true)
  const handleCloseDeleteBudgetModal = () => setOpenDeleteBudgetModal(false)

  
  
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

  const modalStyle = {
    justifyContent: 'center',
    alignItems: 'center'
  }

  useEffect(() => {
    setShortenTransaction(shortenTransaction.filter((transaction) => transaction.amount < 0))
    if(shortenTransaction.length > 3) {
      setShortenTransaction(shortenTransaction.slice(0, 3))
    }
  }, [transactions])

  return (
    <Box sx={{...flexColum, gap: '20px', padding: '32px', backgroundColor: theme.palette.primary.main, borderRadius: '12px', width: '100%'}}>
      <Box sx={{...flexRow, justifyContent: 'space-between'}}>
        <Box sx={{...flexRow, gap: '16px', alignItems: 'center'}}>
          <Box sx={{borderRadius: '50%', width: '16px', height: '16px', backgroundColor: budget.theme}} />
          <Typography variant='h2'>{budget.category}</Typography>
        </Box>
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Button 
            sx={{
              ':hover': {
                cursor: 'pointer',
                transform: 'translateY(-2px) translateX(3px)',
                transition: 'ease-in-out 0.1s'
              }
            }}
            onClick={handleOpenMenu}
          >
            <CustomIcon src="/images/icon-ellipsis.svg" id='budget_option' />
          </Button>
          <Popover
            id={id}
            open={openMenu}
            anchorEl={anchorEl}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            sx={{
              '& .MuiPaper-root': { 
                padding: '12px 12px', 
                borderRadius: '8px',
              },
            }}
          >
            <MenuItem onClick={handleOpenEditBudgetModal}>
              <Typography variant='body1' sx={{ color: theme.palette.grey.main }}>
                Edit Budget
              </Typography>
            </MenuItem>
            <Divider orientation='horizontal' sx={{marginTop: '10px', marginBottom: '10px !important'}} />
            <MenuItem onClick={handleOpenDeleteBudgetModal}>
              <Typography variant='body1' sx={{ color: theme.palette.red.main }}>
                Delete Budget
              </Typography>
            </MenuItem>
          </Popover>
        </Box>
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
        <Stack
          direction="column"
          divider={<Divider orientation='horizontal' flexItem />}
          spacing={5}
          sx={{justifyContent: 'space-between', flex: 1}}
        >
          {shortenTransaction.map((transaction, index) => <Transaction transaction={transaction} overview={false} key={index} bgColor={theme.palette.primary.light} />)}
        </Stack>
      </Box>

      {/* Modal needed */}
      <Modal
        open={openEditBudgetModal}
        onClose={handleCloseEditBudgetModal}
        sx={{...flexRow, ...modalStyle}}
      >
        <EditBudgetModal onClose={handleCloseEditBudgetModal} />
      </Modal>

      <Modal
        open={openDeleteBudgetModal}
        onClose={handleCloseDeleteBudgetModal}
        sx={{...flexRow, ...modalStyle}}
      >
        <DeleteBudgetModal onClose={handleCloseDeleteBudgetModal} />
      </Modal>
    </Box>
  )
}

export default Budget