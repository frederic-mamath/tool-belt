import CastleIcon from "@mui/icons-material/Castle";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { APP_BAR_HEIGHT } from "config/stylesheet";

const SECTIONS = [
  {
    id: "1",
    icon: NotificationsActiveIcon,
    title: "Detect issues as soon as possible",
    description:
      "Log and track your daily meetings, making it easy to identify any issues or challenges that arise to address any potential problems before they escalate",
  },
  {
    id: "2",
    icon: VisibilityIcon,
    title: "Give visibility quickly and regularly",
    description:
      "Generate detailed reports based on meeting data to provide valuable insights into your team's productivity",
  },
  {
    id: "3",
    icon: CastleIcon,
    title: "Benefits from experienced team in software engineering",
    description:
      "Help promote best practices and build a strong collaborative team",
  },
];

const HomePage = () => {
  return (
    <Stack>
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
                <Button color="inherit">Sign In</Button>
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
      <Container>
        <Stack
          sx={{ height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
          direction="row"
        >
          <Stack flex="1" justifyContent="center">
            <Typography variant="h1">Keep the right direction</Typography>
            <Typography variant="h6" sx={{ mb: 6 }}>
              By highlighting the important inputs and outputs of meetings to
              save everyone&apos;s time and allow people to ask the good
              questions at the right moment
            </Typography>
            <Stack direction="row" gap={2}>
              <TextField label="Enter your e-mail" />
              <Button
                color="primary"
                variant="contained"
                sx={{ height: "100%" }}
              >
                Request access
              </Button>
            </Stack>
          </Stack>
          <Stack flex="1" />
        </Stack>
        <Stack textAlign="center" my="80px">
          <Typography sx={{ mb: "80px" }} variant="h2">
            Work in full transparency
          </Typography>
          <Stack direction="row" gap="50px">
            {SECTIONS.map((section) => (
              <Stack key={`section-${section.id}`} flex="1" gap="16px">
                <div>
                  <section.icon sx={{ height: "80px", width: "80px" }} />
                </div>
                <Typography variant="h3">{section.title}</Typography>
                <Typography variant="body1">{section.description}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
};

export default HomePage;
