/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { useField } from 'formik';
import { TextField, InputAdornment, IconButton,Typography } from '@mui/material';

type InputProps = {
  form: any,
  field: any,
  onUpdateValue: () => void,
  placeholder?: string,
}


const PasswordInput = ({ form, field, onUpdateValue, placeholder = "" } : InputProps ) => {
  const [ meta ] = useField(field.name);
  const [ change, setChange ] = useState(false);
  const [ didFocus, setDidFocus ] = useState(false);
  const handleFocus = () => setDidFocus(true);
  const [ showFeedback, setShowFeedback ] = useState(false);
  const [ lostFocus, setLostFocus ] = useState(false);
  const [ showPassword, setShowPassword ] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword)

  const handleChange = (value: any) => {
    if(value) {
      setChange(true);
      form.setFieldValue(field.name, value);
      if(onUpdateValue) {
        onUpdateValue()
      } else {
        setChange(false);
      }
    }
  };

  const handleBlur = () => {
    setLostFocus(true);
  }

  useEffect(() => {
    if((lostFocus && (field.value?.trim().length === 0 || field.value === undefined)) || (field.value && didFocus && field.value?.trim().length > 0 && (meta.error != undefined && meta.error.length != 0))) {
      setShowFeedback(true)
    } else {
      setShowFeedback(false)
    }
  })

  return (
    <div>
      <div style={{display: 'flex', flexDirection: 'column', gap: '4px'}}>
        {(placeholder != '') && <Typography variant='h5'> {placeholder} </Typography>}
        <TextField 
          required
          variant='outlined'
          error={showFeedback}
          helperText={showFeedback && meta.error}
          onChange={(event) => handleChange(event.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{
            width: '100%', 
            fontSize: '14px', 
            '.css-1c07fzc-MuiInputBase-root-MuiOutlinedInput-root': {
              paddingRight: '3px'
            }
          }}
          size="small"
          type={ showPassword ? 'text' : 'password' }
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton 
                  onClick={handleClickShowPassword}
                >
                  { showPassword ? <img src='/images/icon-show-password.svg' /> : <img src='/images/icon-hide-password.svg' /> }
                </IconButton>
              </InputAdornment>
            )
          }}
        />
        <Typography variant='body2' sx={{color: '#696868'}} >Passwords must be at least 8 characters</Typography>
      </div>
    </div>
  )
}

export default PasswordInput;