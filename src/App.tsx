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
import { ROUTES } from "services/routes";

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <AuthenticationCtxProvider>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3}>
            <BrowserRouter>
              <Layout>
                <Routes>
                  <Route path={ROUTES.HOME} element={<HomePage />} />
                  <Route path={ROUTES.SIGN_IN} element={<SignInPage />} />
                  <Route path={ROUTES.DAILY} element={<DailyPage />} />
                  <Route
                    path={ROUTES.ACTIVE_SPRINT}
                    element={<SprintsPage />}
                  />
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
