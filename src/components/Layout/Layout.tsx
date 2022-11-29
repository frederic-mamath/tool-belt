import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'
import { useAuthenticationCtx } from 'contexts/authenticationCtx';
import { ReactNode } from "react";
import { Link } from 'react-router-dom'

import { axiosClient } from 'services/network';

interface Props {
  children: ReactNode
}

const Layout = (props: Props) => {
  const {children} = props;

  const authenticationCtx = useAuthenticationCtx()

  const onLogout = async () => {
    const response = await axiosClient({
      method: "post",
      url: "/api/logout"
    })

    console.log({ response })
  }

  return (
    <Stack gap={4}>
        <AppBar position="sticky">
          <Toolbar sx={{ gap: 2 }}>
            <Link to="/"><Typography variant="h6">Tool belt</Typography></Link>
            {authenticationCtx.isAuthenticated && (
              <>
              <Link to="/daily"><Typography>Daily</Typography></Link>
              <Link to="/ceremony"><Typography>Ceremony</Typography></Link>
              <Button onClick={onLogout} variant="contained">Log out</Button>
              </>
            )}
          </Toolbar>
        </AppBar>
        {children}
      </Stack>
  )
}

export default Layout;
