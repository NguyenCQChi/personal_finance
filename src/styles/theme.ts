/* eslint-disable @typescript-eslint/no-explicit-any */
import { createTheme } from '@mui/material/styles';

let theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Public Sans", sans-serif'
    }
  },
  palette: {
    primary: {
      main: '#FFF', //white
      light: '#F8F4F0', //Beige 100
      dark: '#98908B', //Beige 500
    }
  }
})

theme = createTheme(theme, {
  palette: {
    grey: theme.palette.augmentColor({
      color: {
        main: '#696868', //Grey 500
        light: '#B3B3B3', //Grey 300
        dark: '#201F24', //Grey 900
        contrastText: '#F2F2F2', //Grey 100
      },
      name: 'grey'
    }),
    green: theme.palette.augmentColor({
      color: {
        main: '#277C78'
      },
      name: 'green'
    }),
    yellow: theme.palette.augmentColor({
      color: {
        main: '#F2CDAC'
      },
      name: 'yellow'
    }),
    cyan: theme.palette.augmentColor({
      color: {
        main: '#82C9D7'
      },
      name: 'cyan'
    }),
    navy: theme.palette.augmentColor({
      color: {
        main: '#626070'
      },
      name: 'navy'
    }),
    red: theme.palette.augmentColor({
      color: {
        main: '#C94736'
      },
      name: 'red'
    }),
    purple: theme.palette.augmentColor({
      color: {
        main: '#826CB0',
        light: '#AF81BA' //other purple
      },
      name: 'purple'
    }),
    turquoise: theme.palette.augmentColor({
      color: {
        main: '#597C7C'
      },
      name: 'turquoise'
    }),
    brown: theme.palette.augmentColor({
      color: {
        main: '#93674F'
      },
      name: 'brown'
    }),
    magenta: theme.palette.augmentColor({
      color: {
        main: '#934F6F'
      },
      name: 'magenta'
    }),
    blue: theme.palette.augmentColor({
      color: {
        main: '#3F82B2'
      },
      name: 'blue'
    }),
    navy_grey: theme.palette.augmentColor({
      color: {
        main: '#97A0AC'
      },
      name: 'navy_grey'
    }), 
    army_green: theme.palette.augmentColor({
      color: {
        main: '#7F9161'
      },
      name: 'army_green'
    }),
    gold: theme.palette.augmentColor({
      color: {
        main: '#CAB361'
      },
      name: 'gold'
    }),
    orange: theme.palette.augmentColor({
      color: {
        main: '#BE6C49'
      },
      name: 'orange'
    })
  },
  spacing: (factor: number) => `${factor * 4}px`
})

export default theme;