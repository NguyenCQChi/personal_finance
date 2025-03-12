import { Paper, List, ListItem, Typography } from '@mui/material';
import { useState } from 'react';
import LoginPanel from '../LoginPanel';
import SignupPanel from '../SignupPanel';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/base';
import { useTheme } from '@mui/material/styles';

const Panel = () => {
  const [ logState, setLogState ] = useState(true); //logged in panel or sign up panel
  const theme = useTheme();

  const Item = styled(Paper)(() => ({
    padding: '32px',
    width: '60%',
  }))

  const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const CustomButton = styled(Button)(({theme}) => ({
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    textDecorationLine: 'underline', 
    textUnderlineOffset: '2px',
    ':hover': {
      color: theme.palette.grey.light
    }
  }))

  const handleClick = () => {
    setLogState(!logState);
  }

  return (
    <Item> 
      <List sx={{...item, width: '100%', padding: 0, gap: theme.spacing(4)}}>
        <ListItem>
          { logState ? <LoginPanel /> : <SignupPanel /> }
        </ListItem>
        <ListItem sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '8px'}}>
          <Typography variant='body1'>
            { logState ? 'Need to create an account?' : 'Already have an account?'}
          </Typography>
          <CustomButton onClick={handleClick}>
            <Typography variant='h4' sx={{lineHeight: 0}}>
              { logState ? 'Sign Up' : 'Login'}
            </Typography>
          </CustomButton>
        </ListItem>
      </List>
    </Item>
  )
}

export default Panel;