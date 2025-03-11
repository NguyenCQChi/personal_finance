/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormBase, FastField } from 'formik';
import { Input, PasswordInput } from '@components';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/base';
import { motion } from 'framer-motion';
import { Alert, Box, Typography } from '@mui/material';

const LoginPanel = () => {
  const [ failToast, setFailToast ] = useState(false);
  const disableButton = { backgroundColor: '#B3B3B3' };


  const validationSchema = Yup.object({
    email: Yup.string().required('Email is required').min(1, 'Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length')
  })

  const initialValue = {
    email: '',
    password: '',
  }

  const onSubmit = async (value: any) => {
    console.log(value)
    
    // setPersistence(auth, browserSessionPersistence)
    //   .then(() => {
    //     return signInWithEmailAndPassword(auth, value.email, value.password)
    //       .then((userCredential) => {
    //         setFailToast(false)
    //         socketInitializer(userCredential.user)
    //         sessionStorage.setItem('fromLogin', 'true')
    //         Router.push('/chat')
    //       })
    //       .catch((error) => {
    //         setFailToast(true)
    //       })
    //   })
    //   .catch(error => {
    //     console.log(error.message)
    //   })
  }

  const container = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%',
  }

  const CustomButton = styled(Button)(({theme}) => ({
    width: '100%',
    backgroundColor: theme.palette.grey.dark,
    color: theme.palette.primary.main,
    border: 'none',
    padding: '10px 0',
    borderRadius: '4px',
  }))

  const buttonContainer = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  }

  const hoverButton = {
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#201F24'
  }}

  return (
    <Box sx={container}>
      <Typography variant='h1'>Login</Typography>
      <Formik
        initialValues={initialValue}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        validateOnChange
      >
        {(formik) => {
          const { isValid, dirty } = formik;

          return (
            <FormBase className='form'>
              <FastField
                name='email'
                placeholder='Email'
                required
                component={Input}
              />
              <FastField 
                name='password'
                placeholder='Password'
                required
                component={PasswordInput}
              />
              { failToast && <Alert variant='outlined' severity='error'> Incorrect username or password! Please try again </Alert> }
              <div style={buttonContainer}>
                {(isValid && dirty) ? (
                  <motion.div
                    className='box'
                    whileHover={{scale:1.05}}
                    transition={{type: 'spring', stiffness: 400, damping: 10}}
                    style={{width: '60%', display: 'flex', flexDirection: 'row', justifyContent: 'center'}}
                  >
                    <CustomButton
                      disabled={!(isValid && dirty)}
                      sx={hoverButton}
                      type='submit'
                    >
                      Login
                    </CustomButton>
                  </motion.div>
                ) : (
                  <CustomButton
                    disabled={true}
                    sx={{width: '60%', ...disableButton}}
                  >
                    Login
                  </CustomButton>
                )}
              </div>
            </FormBase>
          )
        }}
      </Formik>
    </Box>
  )
}

export default LoginPanel;