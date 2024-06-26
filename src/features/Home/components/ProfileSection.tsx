import { Avatar, Box, Button, Typography } from "@mui/material";
import smile from "../../../assets/smile.jpg";

function ProfileSection() {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Somos <span style={{ color: "green" }}>Gemas</span> Una empresa
        confiable
      </Typography>
      <Typography variant="body1" gutterBottom>
        Tenemos mas de x tiempoe ne el mercado{" "}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mx: 1 }}>
        Contactanos por Whatsapp
      </Button>
      <Button variant="outlined" sx={{ mx: 1 }}>
        Descargar Catalogo
      </Button>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Avatar src={smile} sx={{ width: 200, height: 200 }} />
      </Box>
    </Box>
  );
}

export default ProfileSection;
