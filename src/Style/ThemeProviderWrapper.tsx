import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { useAppSelector } from "../store/HooksRedux";
import { CssBaseline } from "@mui/material";
import { darkTheme, lightTheme } from "./theme";

const ThemeProviderWrapper = ({ children }: any) => {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export default ThemeProviderWrapper;
