/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Drawer, Box, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Button } from '@mui/base';
import { Budgets, Overview, Pots, Recurring, Transactions } from './containers';
import { useTheme, styled } from '@mui/material/styles';
import CustomIcon from '../../utils/CustomIcon';
import data from '../../../data.json';

const HomePage = () => {
  const [ open, setOpen ] = useState(true);
  const [ value, setValue ] = useState(0);
  const [ component, setComponent ] = useState(<Overview data={data} />)
  const theme = useTheme();
  const drawerWidth = '250px';

  const handleOpenDrawer = () => {
    setOpen(true)
  }

  const handleCloseDrawer = () => {
    setOpen(false)
  }

  const handleChange = (e: any, newValue : number) => {
    setValue(newValue)
    setComponent(panels[newValue])
  }

  const items = [
    {
      name: 'Overview',
      icon: '/images/icon-nav-overview.svg'
    },
    {
      name: 'Transactions',
      icon: '/images/icon-nav-transactions.svg'
    },
    {
      name: 'Budgets',
      icon: '/images/icon-nav-budgets.svg'
    },
    {
      name: 'Pots',
      icon: '/images/icon-nav-pots.svg'
    },
    {
      name: 'Recurring Bills',
      icon: '/images/icon-nav-recurring-bills.svg'
    },
  ]

  const panels = [ <Overview key={0} data={data} />, <Transactions key={1} data={data.transactions} />, <Budgets key={2} data={data.budgets} data_transactions={data.transactions} />, <Pots key={3} data={data.pots} />, <Recurring key={4} data={data.transactions} /> ];

  const container = {
    display: 'flex',
    flexDirection: 'row'
  }

  const openDrawerStyle = {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    overflowX: 'hidden',
    backgroundColor: theme.palette.grey.dark,
  }

  const closeDrawerStyle = {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    padding: theme.spacing(6),
    width: '100px',
    backgroundColor: theme.palette.grey.dark,
  }

  const drawer = {
    width: '100%',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    borderRadius: '0 16px 16px 0',
    '& .MuiDrawer-paper': {
      backgroundColor: theme.palette.grey.dark,
      borderRadius: '0 16px 16px 0'
    }
  }

  const CustomButton = styled(Button)(
    () => (
      {
        backgroundColor: 'transparent',
        border: 'none', 
        color: theme.palette.grey.light,
        ':hover': {
          cursor: 'pointer',
        }
      }
    )
  )

  const mainContainer = {
    flexGrow: 1,
    height: '100vh',
    padding: '32px 40px',
    backgroundColor: theme.palette.primary.light,
  }

  const tabContainer = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  }

  const listItemStyle = {
    color: theme.palette.grey.light,
    padding: '16px 32px',
    borderRadius: '0 16px 16px 0',
  }

  const miniItemStyle = {
    backgroundColor: '#fff',
    borderLeft: `6px solid ${theme.palette.green.main}`,
    ':hover': {
      backgroundColor: '#fff',
      transition: "all 0.3s ease"
    }
  }

  const itemStyle = {
    backgroundColor: '#fff',
    ':hover': {
      backgroundColor: '#fff',
      transition: "all 0.3s ease"
    }
  }

  return (
    <Box sx={container}>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          ...drawer,
          ...(open ? openDrawerStyle : closeDrawerStyle),
        }}
      >
        <Box sx={{margin: '32px 40px'}}><img src={open ? "/images/logo-large.svg" : "/images/logo-small.svg"} alt="logo" /></Box>
        <Box sx={{flex: 1}}>
          <List>
            {
              open ? (
                <Box sx={tabContainer}>
                  {items.map((item, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemButton 
                          sx={{...listItemStyle, ...(index === value ? itemStyle : {} )}}
                          onClick={(e) => handleChange(e, index)}
                        >
                          <CustomIcon
                            src={item.icon}
                            color={index === value ? 'black' : 'grey'}  // Dynamically change color
                          />
                          <ListItemText 
                            primary={item.name} 
                            sx={{color: index === value ? 'black' : 'grey',
                              '& .MuiTypography-root': {
                                fontSize: '16px',
                                fontWeight: 'bold',
                              }
                            }} 
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </Box>
              ) : (
                <Box>
                  {items.map((item, index) => {
                    return (
                      <ListItem key={index}>
                        <ListItemButton 
                          sx={{...listItemStyle, ...(index === value ? miniItemStyle : {} )}}
                          onClick={(e) => handleChange(e, index)}  
                        >
                          <CustomIcon
                            src={item.icon}
                            color={index === value ? 'black' : 'grey'}  // Dynamically change color
                          />
                        </ListItemButton>
                      </ListItem>
                    )
                  })}
                </Box>
              )
            }
          </List>
        </Box>
        <Box sx={{padding: '16px 32px', marginBottom: '24px'}}>
          {open ? (
            <CustomButton onClick={handleCloseDrawer}>
              <Box sx={{display: 'flex', flexDirection: 'row', gap: '16px'}}>
                <img src="/images/icon-minimize-menu.svg" alt="arrow"/>
                <Typography variant="h3">Minimize Menu</Typography>
              </Box>
            </CustomButton>
          ) : (
            <CustomButton onClick={handleOpenDrawer}>
              <img src="/images/icon-minimize-menu.svg" alt="arrow" style={{transform: 'rotateZ(180deg)'}}/>
            </CustomButton>
          )}
        </Box>
      </Drawer>
      <Box component="main" sx={mainContainer}>
        {component}
      </Box>
    </Box>
  )
}

export default HomePage;



