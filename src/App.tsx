import { AppBar, Stack, Toolbar, Typography } from '@mui/material'
import { QueryClientProvider } from "react-query";
import { RouterProvider, createBrowserRouter } from 'react-router-dom'


import DailyPage from 'pages/DailyPage/DailyPage'
import NotFoundErrorPage from 'pages/NotFoundErrorPage'
import SignInPage from 'pages/SignInPage'
import { queryClient } from "services/reactQuery";

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignInPage />,
    errorElement: <NotFoundErrorPage />,
  },
  {
    path: "/daily",
    element: <DailyPage />
  }
])

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <Stack gap={4}>
      <AppBar position="sticky">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6">Tool belt</Typography>
          <Typography>Daily</Typography>
          <Typography>Ceremony</Typography>
        </Toolbar>
      </AppBar>
      <RouterProvider router={router} />
    </Stack>
    </QueryClientProvider>
  )
}

export default App
