import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import { useAuthenticationCtx } from 'contexts/authenticationCtx';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { axiosClient } from "services/network";

interface FormValues {
  email: string;
  password: string;
}

const SignInPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const authenticationCtx = useAuthenticationCtx()
  const { register, handleSubmit } = useForm<FormValues>()

  useEffect(() => {
    if (authenticationCtx.isAuthenticated) {
      navigate("/daily")
    }
  }, [authenticationCtx.isAuthenticated])
  const onSubmit = async (values: FormValues) => {
    const { email, password } = values

    const formData = new FormData();

    formData.append("email", email)
    formData.append("password", password)

    const response = await axiosClient({
      method: "post",
      url: "/api/login",
      data: formData
    })

    if (!response) {
      return;
    }
    
    if (response.status === 200) {
      enqueueSnackbar("You are signed in !", { variant: "success"})
      authenticationCtx.setIsAuthenticated(true);
      authenticationCtx.setConnectedUser({
        email: "frederic.mamath@gmail.com",
        isClearstreamUser: false
      })
      navigate("/daily")
      
      return;
    }
  };

  return (
    <Stack>
      <Typography variant="h2">Sign in</Typography>
      <Card>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="username" {...register("email")} />
        <TextField label="password" {...register("password")} type="password" />
        <Button type="submit">Sign in</Button>
        </form>
      </Card>
    </Stack>
  )
}

export default SignInPage
