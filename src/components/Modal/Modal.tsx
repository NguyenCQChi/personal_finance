import { 
  Box,
  Typography,
  Select,
  MenuItem,
  OutlinedInput,
  FormControl,
  Button,
  InputAdornment
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import data from '../../../data.json';
import { Formik, Form as FormBase } from 'formik';
import format_string from '@src/utils/format_string'

interface onCloseType {
  onClose: () => void
}

const flexRow = {
  display: 'flex',
  flexDirection: 'row',
}

const flexColumn = {
  display: 'flex',
  flexDirection: 'column',
}

const container = {
  padding: '32px',
  gap: '20px',
  borderRadius: '12px',
  width: '40%'
}

const header = {
  justifyContent: 'space-between',
  alignItems: 'center'
}

const CustomButton = ({ children, onClick, style } : { children?: React.ReactNode, onClick: () => void, style?: object }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      sx={{
        ...flexRow,
        padding: '16px', 
        width: '100%', 
        alignItems: 'center', 
        backgroundColor: '#000',
        textTransform: 'none',
        borderRadius: '8px',
        ':hover': {
          cursor: 'pointer',
          backgroundColor: theme.palette.grey.main,
          boxShadow: `2px 2px ${theme.palette.grey.light}`
        },
        ...style
      }}
    >
      {children}
    </Button>
  )
}

const getFocusStyle = (theme) => {
  return {
    padding: '0 15px',
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: theme.palette.grey.light,
      },
      '&:hover fieldset': {
        borderColor: theme.palette.grey.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.grey.dark,
        borderWidth: '1px',
    }},
  }
}

const menuStyle = {
  overflowY: 'auto',
  maxHeight: '250px',
  borderRadius: '8px',
  padding: '0px 15px',
  display: 'flex',
  flexDirection: 'column',
  scrollbarWidth: 'none',
  marginTop: '8px',
  transition: 'all 1s ease-in-out',
  '&.MuiMenu-paper': {
    opacity: 0,
    transform: 'translateY(-10px)',
  },
    '&[aria-hidden="false"]': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}


const AddBudgetModal = ({ onClose } : onCloseType) => {
  const theme = useTheme();
  const categories = data.categories.filter(entry => entry !== "All Transactions");
  const colors = data.colors;

  const textColor = {
    color: theme.palette.grey.main
  }

  const initialValues = {
    category: categories[0],
    limit: 0,
    theme: Object.keys(colors)[0]
  }

  const onSubmit = async(value: any) => {
    console.log(value)
  }

  return (
    <Box sx={{...flexColumn, ...container, backgroundColor: theme.palette.primary.main}}>
      <Box sx={{...flexRow, ...header}}>
        <Typography variant="h1">Add New Budget</Typography>
        <Button onClick={onClose}>
          <img src='/images/icon-close-modal.svg' alt='close' />
        </Button>
      </Box>
      <Typography variant="body1" sx={{...textColor}}>Choose a category to set a spending budget. These categories can help you monitor spending.</Typography>
      <Box sx={{...flexColumn, gap: '16px'}}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <FormBase>
                <FormControl fullWidth margin="normal">
                  <Select
                    id="demo-simple-select-helper"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    name="category"
                    sx={{...getFocusStyle(theme)}}
                    MenuProps={{
                      PaperProps: {
                        style: menuStyle
                      }
                    }}
                  >
                    {categories.map((category, index) => {
                      return (
                        <MenuItem 
                          key={index}
                          value={category}
                          sx={{
                            borderBottom: index < categories.length - 1 ? `1px solid ${theme.palette.primary.light}` : 'none', // Add border-bottom except for the last item
                            padding: '10px 20px'
                          }}
                        >{category}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin='normal'>
                    <OutlinedInput 
                      value={formik.values.limit}
                      onChange={formik.handleChange}
                      placeholder='e.g. 2000'
                      name="limit"
                      sx={{...getFocusStyle(theme)}}
                      startAdornment={<InputAdornment position="start" sx={{marginLeft: '15px'}}>$</InputAdornment>}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <Select
                    id="demo-simple-select-helper"
                    value={formik.values.theme}
                    onChange={formik.handleChange}
                    name="theme"
                    sx={{...getFocusStyle(theme)}}
                    MenuProps={{
                      PaperProps: {
                        style: menuStyle
                      }
                    }}
                  >
                    {Object.entries(colors).map(([theme_name, color], index) => {
                      return (
                        <MenuItem 
                          key={index}
                          value={theme_name}
                          sx={{
                            ...flexRow, 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: index < categories.length - 1 ? `1px solid ${theme.palette.primary.main}` : 'none', 
                            padding: '10px 20px'
                          }}
                        >
                          <Box sx={{...flexRow, gap: '12px', alignItems: 'center'}}>
                            <Box sx={{width: '16px', height: '16px', backgroundColor: color, borderRadius: '50%'}}/>
                            <Typography variant='body1' sx={{...textColor}}>{format_string(theme_name)}</Typography>
                          </Box>
                          {index < 4 && <Typography variant='body2' sx={{...textColor}}>Already in use</Typography>}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>

                <CustomButton onClick={onClose} style={{marginTop: '16px'}}>
                  <Typography variant='h4'>Add Budget</Typography>
                </CustomButton>
              </FormBase>
            )
          }}
        </Formik>
      </Box>
    </Box>
  )
}

const EditBudgetModal = ({ onClose } : onCloseType) => {
  const theme = useTheme();
  const categories = data.categories.filter(entry => entry !== "All Transactions");
  const colors = data.colors;

  const textColor = {
    color: theme.palette.grey.main
  }

  const initialValues = {
    category: categories[0],
    limit: 0,
    theme: Object.keys(colors)[0]
  }

  const onSubmit = async(value: any) => {
    console.log(value)
  }

  return (
    <Box sx={{...flexColumn, ...container, backgroundColor: theme.palette.primary.main}}>
      <Box sx={{...flexRow, ...header}}>
        <Typography variant="h1">Edit Budget</Typography>
        <Button onClick={onClose}>
          <img src='/images/icon-close-modal.svg' alt='close' />
        </Button>
      </Box>
      <Typography variant="body1" sx={{...textColor}}>As your budget changes, feel free to update your spending limits.</Typography>
      <Box sx={{...flexColumn, gap: '16px'}}>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <FormBase>
                <FormControl fullWidth margin="normal">
                  <Select
                    id="demo-simple-select-helper"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    name="category"
                    sx={{...getFocusStyle(theme)}}
                    MenuProps={{
                      PaperProps: {
                        style: menuStyle
                      }
                    }}
                  >
                    {categories.map((category, index) => {
                      return (
                        <MenuItem 
                          key={index}
                          value={category}
                          sx={{
                            borderBottom: index < categories.length - 1 ? `1px solid ${theme.palette.primary.light}` : 'none', // Add border-bottom except for the last item
                            padding: '10px 20px'
                          }}
                        >{category}</MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>

                <FormControl fullWidth margin='normal'>
                    <OutlinedInput 
                      value={formik.values.limit}
                      onChange={formik.handleChange}
                      placeholder='e.g. 2000'
                      name="limit"
                      sx={{...getFocusStyle(theme)}}
                      startAdornment={<InputAdornment position="start" sx={{marginLeft: '15px'}}>$</InputAdornment>}
                    />
                </FormControl>

                <FormControl fullWidth margin="normal">
                  <Select
                    id="demo-simple-select-helper"
                    value={formik.values.theme}
                    onChange={formik.handleChange}
                    name="theme"
                    sx={{...getFocusStyle(theme)}}
                    MenuProps={{
                      PaperProps: {
                        style: menuStyle
                      }
                    }}
                  >
                    {Object.entries(colors).map(([theme_name, color], index) => {
                      return (
                        <MenuItem 
                          key={index}
                          value={theme_name}
                          sx={{
                            ...flexRow, 
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottom: index < categories.length - 1 ? `1px solid ${theme.palette.primary.main}` : 'none', 
                            padding: '10px 20px'
                          }}
                        >
                          <Box sx={{...flexRow, gap: '12px', alignItems: 'center'}}>
                            <Box sx={{width: '16px', height: '16px', backgroundColor: color, borderRadius: '50%'}}/>
                            <Typography variant='body1' sx={{...textColor}}>{format_string(theme_name)}</Typography>
                          </Box>
                          {index < 4 && <Typography variant='body2' sx={{...textColor}}>Already in use</Typography>}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </FormControl>

                <CustomButton onClick={onClose} style={{marginTop: '16px'}}>
                  <Typography variant='h4'>Save Changes</Typography>
                </CustomButton>
              </FormBase>
            )
          }}
        </Formik>
      </Box>
    </Box>
  )
}

const DeleteBudgetModal = ({ onClose, budget_type="Entertainment" } : { onClose: () => void, budget_type?: string}) => {
  const theme = useTheme();
  const header_title = `Delete '${budget_type}'`

  const textColor = {
    color: theme.palette.grey.main
  }

  return (
    <Box sx={{...flexColumn, ...container, backgroundColor: theme.palette.primary.main}}>
      <Box sx={{...flexRow, ...header}}>
        <Typography variant="h1">{header_title}</Typography>
        <Button onClick={onClose}>
          <img src='/images/icon-close-modal.svg' alt='close' />
        </Button>
      </Box>
      <Typography variant="body1" sx={{...textColor}}>Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever.</Typography>
      <Box sx={{...flexColumn, gap: '5px'}}>
        <CustomButton
          onClick={onClose}
          style={{
            backgroundColor: theme.palette.red.main,
            ':hover': {
              backgroundColor: `${theme.palette.red.main}90`
            }
          }}
        >
          <Typography variant='h4'>Yes, Confirm Deletion</Typography>
        </CustomButton>
        <CustomButton
          onClick={onClose}
          style={{
            backgroundColor: 'transparent',
            ':hover': {
              backgroundColor: 'transparent'
            }
          }}
        >
          <Typography variant="body1" sx={{...textColor}}>No, Go Back</Typography> 
        </CustomButton>
      </Box>
    </Box>
  )
}

const AddPotModal = ({ onClose } : onCloseType) => {
  return (
    <Box sx={{...flexColumn, ...container}}>

    </Box>
  )
}

const EditPotModal = ({ onClose } : onCloseType) => {
  return (
    <Box sx={{...flexColumn, ...container}}>

    </Box>
  )
}

const DeletePotModal = ({ onClose } : onCloseType) => {
  return (
    <Box sx={{...flexColumn, ...container}}>

    </Box>
  )
}

const WithdrawPotModal = ({ onClose } : onCloseType) => {
  return (
    <Box sx={{...flexColumn, ...container}}>

    </Box>
  )
}

const AddToPotModal = ({ onClose } : onCloseType) => {
  return (
    <Box sx={{...flexColumn, ...container}}>

    </Box>
  )
}

export { 
  AddBudgetModal, 
  EditBudgetModal, 
  DeleteBudgetModal,
  AddPotModal,
  EditPotModal,
  DeletePotModal,
  WithdrawPotModal,
  AddToPotModal
}