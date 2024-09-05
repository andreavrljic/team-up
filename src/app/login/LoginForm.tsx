'use client';
import BasicTextfield from '@/app/components/BasicTexfield';
import { flexColumn, flexRow } from '@/theme/sharedStyle';
import { Box, Divider, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { registerUser, signInUser } from '@/firebase/config';
import { UserAuth } from '@/app/context/AuthContext';
import GoogleIcon from '@mui/icons-material/Google';
import { DeviceContext } from '@/app/context/DeviceTypeContext';
import { useRouter } from 'next/navigation';
import TUButton from '../components/TUButton';
import { useForm } from 'react-hook-form';
import { LoginFormType } from '../types';
import { LoginSchema } from '../zodFormType';
import { zodResolver } from '@hookform/resolvers/zod';

const LoginForm = () => {
  const deviceType = useContext(DeviceContext);
  const [signUp, setSignUp] = useState(false);
  const loginForm = useForm<LoginFormType>({
    resolver: zodResolver(LoginSchema(signUp)),
  });
  const { user, googleSignIn, logOut } = UserAuth();

  const {
    handleSubmit,
    formState: { errors },
    watch,
    register,
    getValues,
  } = loginForm;

  useEffect(() => {
    console.log('errr', errors);
  }, [errors]);

  const router = useRouter();

  const handleSigningSubmit = () => {
    const loginFormValue = getValues();
    if (signUp) {
      registerUser(loginFormValue.email, loginFormValue.password);
      router.push('/welcome');
    } else {
      signInUser(loginFormValue.email, loginFormValue.password);
      router.push('/home');
    }
  };

  const handleSignInGoogle = async () => {
    try {
      const result = await googleSignIn();
      if (result.user) {
        router.push('/home');
      }
    } catch (error) {
      console.error('Sign in Google error', error);
    }
  };
  const handleChangeSignIn = () => {
    setSignUp((prevState) => !prevState);
  };

  return (
    <Box
      sx={{
        ...flexColumn,
        flexGrow: 1,
        minHeight: '1rem',
        justifyContent: 'center',
        padding: '0.5rem',
        gap: '2rem',
        alignItems: 'center',
      }}
    >
      <Typography variant='h5'>{signUp ? 'Sign up' : 'Sign in'}</Typography>
      <Box
        sx={{
          ...flexColumn,
          gap: '2rem',
          minWidth: deviceType === 'desktop' ? '50%' : '100%',
        }}
      >
        {signUp && (
          <BasicTextfield form={loginForm} id={'username'} label={'Username'} />
        )}
        <BasicTextfield form={loginForm} id={'email'} label={'E-mail'} />
        <BasicTextfield form={loginForm} id={'password'} label={'Password'} />
        {signUp && (
          <BasicTextfield
            form={loginForm}
            id={'confirmPassword'}
            label={'Confirm password'}
          />
        )}

        <TUButton
          variant='contained'
          color='warning'
          onClick={handleSubmit(handleSigningSubmit)}
          label={signUp ? 'Register' : 'Sign In'}
        />

        <Box sx={{ ...flexRow, justifyContent: 'space-between' }}>
          <Typography>{signUp ? 'Have' : 'Do not have'} an account?</Typography>
          <TUButton
            variant='text'
            label={signUp ? 'Sign in' : 'Sign up'}
            onClick={handleChangeSignIn}
          />
        </Box>
        <Divider />
        <TUButton
          variant='contained'
          onClick={handleSignInGoogle}
          startIcon={<GoogleIcon />}
          label='Continue with google'
        />
      </Box>
    </Box>
  );
};

export default LoginForm;
