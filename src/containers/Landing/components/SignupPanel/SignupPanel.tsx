/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form as FormBase, FastField } from 'formik';
import { Input, PasswordInput } from '@components';
import { styled } from '@mui/material/styles';
import { Button } from '@mui/base';  
import { motion } from 'framer-motion';
import { Alert, Typography, Box } from '@mui/material';


const SignupPanel = () => {
  const [ failToast, setFailToast ] = useState(false);
  const disableButton = { backgroundColor: '#B3B3B3' };

  const mailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  const validationSchema = Yup.object({
    name: Yup.string().required('Username is required').min(1, 'Username is required'),
    email: Yup.string().required('Email is required').matches(mailReg, 'Email address is not valid'),
    password: Yup.string().required('Password is required').min(8, 'Password should be of minimum 8 characters length')
  })

  const initialValue = {
    name: '',
    email: '',
    password: '',
  }

  const onSubmit = async (value: any) => {
    console.log(value)
    // setPersistence(auth, browserSessionPersistence)
    //   .then(() => {
    //     return createUserWithEmailAndPassword(auth, value.email, value.password)
    //       .then((userCredential) => {
    //         const user = userCredential.user
    //         updateProfile(user, { 
    //           displayName: value.name
    //         }).then(async() => {
    //           setFailToast(false)
    //           const userData: UserType = {
    //             name: value.name,
    //             userId: userCredential.user.uid,
    //             friends: [],
    //             rooms: []
    //           }
          
    //           try {
    //             await setDoc(doc(database, 'users', userCredential.user.uid), userData)
    //           } catch(e) {
    //             return
    //           }

    //           socketInitializer(userData)
    //           sessionStorage.setItem('fromLogin', 'false')
    //           Router.push('/chat')
    //         })
    //         .catch((error) => {
    //           setFailToast(true);
    //         })
    //       })
    //       .catch((error) => {
    //         setFailToast(true);
    //       })
    //   }).catch((error) => {
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
      <Typography variant='h1'>Sign Up</Typography>
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
                name='name'
                placeholder='Username'
                required
                component={Input}
              />
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
              { failToast && <Alert variant='outlined' severity='error'> Cannot create account! </Alert> }
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
                      Create
                    </CustomButton>
                  </motion.div>
                ) : (
                  <CustomButton
                    disabled={true}
                    sx={{width: '60%', ...disableButton}}
                  >
                    Create
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

export default SignupPanel;