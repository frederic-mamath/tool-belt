import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import { useAuthenticationCtx } from 'contexts/authenticationCtx';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { axiosClient } from "services/network";

const SignInPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const navigate = useNavigate()
  const authenticationCtx = useAuthenticationCtx()

  useEffect(() => {
    if (authenticationCtx.isAuthenticated) {
      navigate("/daily")
    }
  }, [authenticationCtx.isAuthenticated])
  const onSubmit = async () => {
    const formData = new FormData();

    formData.append("email", "frederic.mamath@gmail.com")
    formData.append("password", "testtest")

    const response = await axiosClient({
      method: "post",
      url: "/api/login",
      data: formData
    })

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
        <TextField label="username" />
        <TextField label="password" type="password" />
        <Button onClick={onSubmit}>Sign in</Button>
      </Card>
    </Stack>
  )
}

export default SignInPage
