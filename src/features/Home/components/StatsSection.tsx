import { Box, Grid, Typography } from "@mui/material";

function StatsSection() {
  return (
    <Box sx={{ py: 6, textAlign: "center" }}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <Typography variant="h5" component="h2">
            1000+
          </Typography>
          <Typography variant="body2">Clientes felices</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" component="h2">
            200+
          </Typography>
          <Typography variant="body2">Premios entregados este mes</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="h5" component="h2">
            100+
          </Typography>
          <Typography variant="body2">Usuarios Registrados</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default StatsSection;
