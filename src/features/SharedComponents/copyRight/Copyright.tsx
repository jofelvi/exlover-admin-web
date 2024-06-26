import { Copyright as CopyrightIcon } from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export function CopyrightCustom() {
  return (
    <>
      <Typography style={{ marginTop: 20 }} variant="body2" align="center">
        <CopyrightIcon fontSize="small" /> <br />
        Ex-Lover {new Date().getFullYear()}
      </Typography>
    </>
  );
}
