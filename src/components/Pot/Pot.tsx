import { useState, useEffect } from 'react';
import { PotType } from "@src/types";
import { 
  Box,
  Typography,
  Button,
  Popover,
  MenuItem,
  Divider,
  Modal
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTheme } from '@mui/material/styles';
import CustomIcon from '@src/utils/CustomIcon';
import { EditPotModal, DeletePotModal } from '../Modal';
import format_number from '@src/utils/format_number';

const Pot = ({ pot } : { pot : PotType}) => {
  const theme = useTheme();

  const [ progress, setProgress ] = useState('');
  const [ anchorEl, setAnchorEl ] = useState(null);
  
  const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };
  
  const handleCloseMenu = () => setAnchorEl(null)
  
  const openMenu = Boolean(anchorEl);
  const id = openMenu ? 'simple-popover' : undefined;

  // State and handling for modals
  const [ openEditPotModal, setOpenEditPotModal ] = useState(false);
  const [ openDeletePotModal, setOpenDeletePotModal ] = useState(false);

  const handleOpenEditPotModal = () => setOpenEditPotModal(true)
  const handleCloseEditPotModal = () => setOpenEditPotModal(false)

  const handleOpenDeletePotModal = () => setOpenDeletePotModal(true)
  const handleCloseDeletePotModal = () => setOpenDeletePotModal(false)

  const flexColumn = {
    display: 'flex',
    flexDirection: 'column'
  }

  const flexRow = {
    display: 'flex',
    flexDirection: 'row'
  }
  
  const container = { 
    backgroundColor: theme.palette.primary.main,
    borderRadius: '12px',
    padding: '24px 24px',
    gap: '32px'
  }

  const header = {
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const textColor = {
    color: theme.palette.grey.main
  }

  useEffect(() => {
    const current_progress = (pot.total / pot.target * 100).toFixed(2)
    setProgress(current_progress)
  }, [pot.target, pot.total])

  return (
    <Box sx={{...flexColumn, ...container}}>
      <Box sx={{...flexRow, ...header}}>
        <Box sx={{...flexRow, gap: '16px', alignItems: 'center'}}>
          <Box sx={{width: '16px', height: '16px', backgroundColor: pot.theme, borderRadius: '50%'}} />
          <Typography variant='h2'>{pot.name}</Typography>
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
            <MenuItem onClick={handleOpenEditPotModal}>
              <Typography variant='body1' sx={{ color: theme.palette.grey.main }}>
                Edit Budget
              </Typography>
            </MenuItem>
            <Divider orientation='horizontal' sx={{marginTop: '10px', marginBottom: '10px !important'}} />
            <MenuItem onClick={handleOpenDeletePotModal}>
              <Typography variant='body1' sx={{ color: theme.palette.red.main }}>
                Delete Budget
              </Typography>
            </MenuItem>
          </Popover>
        </Box>
      </Box>
      <Box sx={{...flexColumn, gap: '16px'}}>
        <Box sx={{...flexRow, justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant='body1' sx={{...textColor}}>Total Saved</Typography>
          <Typography variant='h1'>{format_number(pot.total)}</Typography>
        </Box>
        <Box sx={{backgroundColor: theme.palette.primary.light, width: '100%', height: '8px', borderRadius: '4px'}}>
          <Box sx={{backgroundColor: pot.theme, width: `${progress}%`, height: '100%', borderRadius: '4px'}} />
        </Box>
        <Box sx={{...flexRow, justifyContent: 'space-between', alignItems: 'center'}}>
            <Typography variant='h5' sx={{...textColor}}>{progress + '%'}</Typography>
            <Typography variant='body2' sx={{...textColor}}>Target of {format_number(pot.target)}</Typography>
        </Box>
      </Box>
      <Grid container columns={12} spacing={4}>
        <Grid size={6}>

        </Grid>
        <Grid size={6}>

        </Grid>
      </Grid>

      <Modal
        open={openEditPotModal}
        onClose={handleCloseEditPotModal}
      >
        <EditPotModal onClose={handleCloseEditPotModal} />
      </Modal>

      <Modal
        open={openDeletePotModal}
        onClose={handleCloseDeletePotModal}
      >
        <DeletePotModal onClose={handleCloseDeletePotModal} />
      </Modal>
    </Box>
  )
}

export default Pot;