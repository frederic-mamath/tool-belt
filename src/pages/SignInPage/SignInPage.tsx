import { Button, Card, Stack, TextField, Typography } from '@mui/material'

import Speakers from 'components/Speakers'
import { useGetRecipes } from 'generated/hook'

const SignInPage = () => {
  const { data } = useGetRecipes()

  console.log({ data, Speakers })

  return (
    <Stack>
      <Typography variant="h2">Sign in</Typography>
      <Card>
        <TextField label="username" />
        <TextField label="password" type="password" />
        <Button>Sign in</Button>
      </Card>
    </Stack>
  )
}

export default SignInPage
