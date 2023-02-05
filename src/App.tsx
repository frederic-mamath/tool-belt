import { ThemeProvider } from "@mui/material";
import { AuthenticationCtxProvider } from "contexts/authenticationCtx";
import { SnackbarProvider } from "notistack";
import { QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "components/Layout";
import { customTheme } from "config/stylesheet";
import DailyPage from "pages/DailyPage/DailyPage";
import HomePage from "pages/HomePage";
import SignInPage from "pages/SignInPage";
import SprintPage from "pages/SprintPage";
import SprintsPage from "pages/SprintsPage";
import { queryClient } from "services/reactQuery";

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthenticationCtxProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/sign/in" element={<SignInPage />} />
                  <Route path="/daily" element={<DailyPage />} />
                  <Route path="/sprints" element={<SprintsPage />} />
                  <Route path="/sprints/:sprintId" element={<SprintPage />} />
                </Routes>
              </Layout>
            </BrowserRouter>
          </SnackbarProvider>
        </QueryClientProvider>
      </AuthenticationCtxProvider>
    </ThemeProvider>
  );
};

export default App;
