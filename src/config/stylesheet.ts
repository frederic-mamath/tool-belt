import { createTheme } from "@mui/material";

export const APP_BAR_HEIGHT = "56px";

export const fontSize = {
  xxl: "40px",
  xl: "24px",
};

export let customTheme = createTheme({
  typography: {
    h2: {
      fontSize: fontSize.xxl,
      fontWeight: 700,
    },
    h3: {
      fontSize: fontSize.xl,
      fontWeight: 700,
    },
  },
});

customTheme = createTheme(customTheme, {});
