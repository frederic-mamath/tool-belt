import { Button, Card, Stack, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack';


import Speakers from 'components/Speakers'
import { useGetBookings, useGetRecipes } from 'generated/hook'
import { axiosClient } from "services/network";


const SignInPage = () => {
  const { data: recipesData } = useGetRecipes()
  const { data: bookingData } = useGetBookings()
  const { enqueueSnackbar } = useSnackbar()

  console.log({ bookingData, recipesData, Speakers })

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
