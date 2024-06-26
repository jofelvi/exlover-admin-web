import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../store/HooksRedux";
import { toggleTheme } from "../../../store/theme/themeSlice";

//  'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
const ThemeToggleButton: React.FC = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  return (
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => dispatch(toggleTheme())}
    >
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </Button>
  );
};

export default ThemeToggleButton;
