import { Button, Card, Stack, TextField, Typography } from "@mui/material";

interface Props {}

const SignInPage = (props: Props) => {
  const {} = props;

  return (
    <Stack>
      <Typography variant="h2">Sign in</Typography>
      <Card>
        <TextField label="username" />
        <TextField label="password" type="password" />
        <Button>Sign in</Button>
      </Card>
    </Stack>
  );
};

export default SignInPage;
