import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

function SkillsSection() {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Porque confiar en <span style={{ color: "green" }}>nosotros?</span>
      </Typography>
      <Typography variant="body1" gutterBottom>
        estamos aca para apoyarte en tu proximo emprendimiento.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mb: 4 }}>
        Contactanos
      </Button>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3">
                Como funciona
              </Typography>
              <Typography variant="body2">
                Conoces como funciona nuestro sistema de reconpensas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3">
                Premios del mes
              </Typography>
              <Typography variant="body2">Aca los premios del mes</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" component="h3">
                Casos de exito
              </Typography>
              <Typography variant="body2">Casos</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SkillsSection;
