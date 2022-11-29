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
    await axiosClient({
      method: "post",
      url: "/api/logout"
    })
  }

  return (
    <Stack gap={4}  sx={{ minHeight: authenticationCtx.isAuthenticated ? "calc(100vh - 64px - 32px - 32px - 32px)" : "100vh"}}>
            {authenticationCtx.isAuthenticated && (

        <AppBar position="sticky">
          <Toolbar sx={{ gap: 2 }}>
            <Link to="/"><Typography variant="h6">Tool belt</Typography></Link>
              <>
              <Link to="/daily"><Typography>Daily</Typography></Link>
              <Link to="/ceremony"><Typography>Ceremony</Typography></Link>
              <Button onClick={onLogout} variant="contained">Log out</Button>
              </>
          </Toolbar>
        </AppBar>
            )}
        <Stack flex={1}>
        {children}
        </Stack>
      </Stack>
  )
}

export default Layout;
