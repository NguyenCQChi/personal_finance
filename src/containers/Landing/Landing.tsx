/* eslint-disable @next/next/no-img-element */
import { Panel } from './components';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Landing = () => {
  const theme = useTheme();

  const pageContainer = {
    backgroundColor: theme.palette.primary.light,
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  }

  const logoContainer = {
    padding: theme.spacing(5),
    position: 'relative',
    display: 'inline-block'
  }

  const imageContainer = {
    borderRadius: '20px',
    overflow: 'hidden',
    display: 'block'
  }

  const descriptionContainer = {
    position: 'absolute',
    top: 0, 
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'space-between',
    zIndex: 2,
    padding: theme.spacing(10),
    height: '100%'
  }

  const textWrapper = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'between',
    gap: '24px'
  }

  const panelContainer = {
    backgroundColor: '#000',
    flex: 1,
    position: 'relative'
  }

  return (
    <Box sx={pageContainer}>
      <Box sx={logoContainer}>
        <Box sx={imageContainer}>
          <img 
            src='images/illustration-authentication.svg'
            alt='logo'
          />
        </Box>
        <Box sx={descriptionContainer}>
          <img 
            src='/images/logo-large.svg'
            alt='logo'
            style={{width: 'auto'}}
          />
          <Box sx={textWrapper}>
            <Box>Keep track of your money and save for your future</Box>
            <Box>Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.</Box>
          </Box>
        </Box>
      </Box>
      <Box sx={panelContainer}>
        <Panel />
      </Box>
    </Box>
  )
}

export default Landing;