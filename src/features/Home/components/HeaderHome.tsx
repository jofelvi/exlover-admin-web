import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HeaderHome() {
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Gemas
        </Typography>
        <Button color="inherit">Conocenos</Button>
        <Button color="inherit">Como ganar Dinero</Button>
        <Button color="inherit">Testimonios</Button>
        <Link to="/login">
          {" "}
          <Button variant="outlined">Ingresar Aqui</Button>{" "}
        </Link>
      </Toolbar>
    </AppBar>
  );
}

export default HeaderHome;
