import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { ROUTES } from "services/routes";

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar color="primary" position="sticky">
      <Container>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          py={1}
        >
          <Stack direction="row">
            <img
              src="/logo512.png"
              alt="logo"
              style={{ height: 40, width: 40 }}
            />
            <Button color="inherit">Daily</Button>
            <Button color="inherit">Weekly</Button>
          </Stack>
          <Box
            sx={{
              display: {
                sm: "block",
                xs: "none",
              },
            }}
          >
            <Stack direction="row">
              <Button color="inherit" onClick={() => navigate(ROUTES.SIGN_IN)}>
                Sign In
              </Button>
              <Button color="inherit">Request Access</Button>
            </Stack>
          </Box>
          <Box
            sx={{
              display: {
                sm: "none",
              },
            }}
          >
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>
        </Stack>
      </Container>
    </AppBar>
  );
};

export default NavBar;
