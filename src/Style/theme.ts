import { createTheme } from "@mui/material/styles";
import { blue, grey, orange, red } from "@mui/material/colors";

const commonSettings = {
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
    },
    h2: {
      fontSize: "2rem",
    },
    h3: {
      fontSize: "1.75rem",
    },
  },
  spacing: 8,
};

export const lightTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "light",
    primary: {
      main: orange[500], // Naranja vibrante como primario
    },
    secondary: {
      main: "#ff3d00", // Naranja intenso para contraste
      contrastText: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    text: {
      primary: "#212121",
      secondary: grey[600], // Gris oscuro para texto secundario
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: grey[100],
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: orange[300],
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: orange[400],
          } /*
          '&:hover': {
            backgroundColor: orange[300], 
          }, */,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // ... (otros estilos del botón)
        },
        containedSecondary: {
          color: "white",
        },
      },
    },
    MuiFilledInput: {
      // Personaliza el Input del TextField filled
      styleOverrides: {
        root: {
          backgroundColor: "#fbe9e7",
          /* '& .MuiOutlinedInput-notchedOutline': { 
            borderColor: orange[300], 
          },
          '&:hover .MuiOutlinedInput-notchedOutline': { 
            borderColor: orange[700], 
          },
          '&:hover': {
            backgroundColor: orange[300], 
          }, */
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  ...commonSettings,
  palette: {
    mode: "dark",
    primary: {
      main: orange[500], // Naranja vibrante como primario
    },
    secondary: {
      main: "#ff3d00", // Naranja intenso para contraste
      contrastText: "#ffffff",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#303030",
      paper: "#424242",
    },
    text: {
      primary: grey[100],
      secondary: grey[500],
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: `1px solid ${grey[700]}`,
          "&.Mui-focused fieldset": {
            borderColor: blue[500],
          },
          "& input": {
            color: grey[300],
          },
          "&:hover fieldset": {
            borderColor: grey[600],
          },
        },
      },
    },
    MuiFilledInput: {
      // Personaliza el Input del TextField filled
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          border: `1px solid ${grey[700]}`,
          "&.Mui-focused fieldset": {
            borderColor: blue[500],
          },
          "& input": {
            color: grey[300],
          },
          "&:hover fieldset": {
            borderColor: grey[600],
          },
        },
      },
    },
  },
});
