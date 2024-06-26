import { styled } from "@mui/material/styles";
import { Box, Button, InputBase, Select, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";

const darkBackground = "#2A3142";
const darkBorder = "#3d3d47";
const lightText = "#e9ecef";
const focusBorder = "#8b5cf6";
const hoverBackground = "#32323e";
const iconColor = "#8b5cf6";

export const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  backgroundColor: "#2c2c2c",
  color: "white",
}));

export const CustomSelect = styled(Select)({
  "& .MuiFilledInput-root": {
    backgroundColor: "#424242",
    borderRadius: 4,
  },
});

export const FormContainer = styled(Box)(({ theme }) => ({
  color: lightText,
  backgroundColor: darkBackground,
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: darkBackground,
    border: `1px solid ${darkBorder}`,
    fontSize: 16,
    padding: "10px 12px",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    "&:focus": {
      borderColor: focusBorder,
      boxShadow: `0 0 0 2px ${focusBorder}40`,
    },
  },
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: lightText,
    backgroundColor: darkBackground,
    "& fieldset": {
      borderColor: darkBorder,
    },
    "&:hover fieldset": {
      borderColor: darkBorder,
    },
    "&.Mui-focused fieldset": {
      borderColor: focusBorder,
    },
  },
  "& .MuiInputLabel-root": {
    color: lightText,
    "&.Mui-focused": {
      color: focusBorder, // Cambia el color cuando está enfocado
    },
  },
  "& .MuiInputLabel-shrink": {
    backgroundColor: darkBackground,
    padding: "0 4px",
    marginLeft: "-4px",
    marginRight: "4px",
  },
}));

export const StyledSelect = styled(Select)(({ theme }) => ({
  color: lightText,
  backgroundColor: darkBackground,
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: darkBorder,
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: darkBorder,
  },
  "& .MuiSvgIcon-root": {
    color: lightText,
  },
  "&.Mui-focused fieldset": {
    borderColor: focusBorder,
    borderRadius: 4,
  },
  "&:hover fieldset": {
    borderColor: focusBorder,
    borderRadius: 4,
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#b64fc8",
  color: lightText,
  "&:hover": {
    backgroundColor: "#9f3ab8",
  },
}));

export const CustomDatePicker = styled(DatePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: lightText,
    backgroundColor: darkBackground,
    "& fieldset": {
      borderColor: darkBorder,
    },
    "&:hover fieldset": {
      borderColor: darkBorder,
    },
    "&.Mui-focused fieldset": {
      borderColor: focusBorder,
    },
  },
  "& .MuiInputLabel-root": {
    color: lightText,
    "&.Mui-focused": {
      color: focusBorder,
    },
  },
  "& .MuiSvgIcon-root": {
    color: lightText,
    "&:hover, &.Mui-focused": {
      color: focusBorder,
    },
  },
}));

export const CustomTimePicker = styled(TimePicker)(({ theme }) => ({
  "& .MuiInputBase-root": {
    color: lightText,
    backgroundColor: darkBackground,
    "& fieldset": {
      borderColor: darkBorder,
    },
    "&:hover fieldset": {
      borderColor: darkBorder,
    },
    "&.Mui-focused fieldset": {
      borderColor: focusBorder,
    },
  },
  "& .MuiInputLabel-root": {
    color: lightText,
    "&.Mui-focused": {
      color: focusBorder,
    },
  },

  "& .MuiSvgIcon-root": {
    color: lightText,
    "&:hover, &.Mui-focused": {
      color: focusBorder,
    },
  },
}));
