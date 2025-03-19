import { useState } from 'react';
import { 
  Box,
  Typography,
  Modal
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Button } from '@mui/base';
import { useTheme, styled } from '@mui/material/styles';
import { PotType } from '@src/types';
import { AddPotModal } from '@src/components/Modal';
import { Pot } from '@components';

const Pots = ({ data } : PotType[]) => {
  const theme = useTheme();

  const [ openAddPotModal, setOpenAddPotModal ] = useState(false)

  const handleOpenAddPotModal = () => setOpenAddPotModal(true)
  const handleCloseAddPotModal = () => setOpenAddPotModal(false)

  const flexColumn = {
    display: 'flex',
    flexDirection: 'column'
  }

  const flexRow = {
    display: 'flex',
    flexDirection: 'row'
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
        <Typography variant="h1">Pots</Typography>
        <CustomButton onClick={handleOpenAddPotModal}>
          <Typography variant="h4">+ Add New Pot</Typography>
        </CustomButton>
      </Box>
      <Grid container spacing={6} columns={12}>
        {data.map((pot, index) => {
          return (
            <Grid size={6} key={index}>
              <Pot pot={pot} />
            </Grid>
          )
        })}
      </Grid>

     {/* Modal */}
    <Modal
      open={openAddPotModal}
      onClose={handleCloseAddPotModal}
      sx={{
        ...flexRow,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AddPotModal onClose={handleCloseAddPotModal} />
     </Modal>
    </Box>
  )
}

export default Pots