import { AppBar, Stack, Toolbar, Typography } from '@mui/material'
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom'

import DailyPage from 'pages/DailyPage/DailyPage'
import SignInPage from 'pages/SignInPage'
import { queryClient } from "services/reactQuery";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
    <Stack gap={4}>
        <AppBar position="sticky">
          <Toolbar sx={{ gap: 2 }}>
            <Link to="/"><Typography variant="h6">Tool belt</Typography></Link>
            <Link to="/daily"><Typography>Daily</Typography></Link>
            <Link to="/ceremony"><Typography>Ceremony</Typography></Link>
          </Toolbar>
        </AppBar>
      </Stack>
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/daily" element={<DailyPage />} />
      <Route path="/ceremony" element={<SignInPage />} />
    </Routes>
    </BrowserRouter>
    </SnackbarProvider>
    </QueryClientProvider>
  )
}

export default App
