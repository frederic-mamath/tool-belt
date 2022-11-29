import { AuthenticationCtxProvider } from 'contexts/authenticationCtx';
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from 'components/Layout';
import DailyPage from 'pages/DailyPage/DailyPage'
import SignInPage from 'pages/SignInPage'
import { queryClient } from "services/reactQuery";

const App = () => {
  return (
    <AuthenticationCtxProvider>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider maxSnack={3}>
    <BrowserRouter>
    
      <Layout>
    <Routes>
      <Route path="/" element={<SignInPage />} />
      <Route path="/daily" element={<DailyPage />} />
      <Route path="/ceremony" element={<SignInPage />} />
    </Routes>
    </Layout>
    </BrowserRouter>
    </SnackbarProvider>
    </QueryClientProvider>
    </AuthenticationCtxProvider>
  )
}

export default App
