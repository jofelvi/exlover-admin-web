import { Box, Grid, Paper, Typography } from "@mui/material";

interface IngresosMembresiasProps {
  mesActual: string | number;
  mesAnterior: string | number;
}

const IngresosMembresia = ({
  mesActual,
  mesAnterior,
}: IngresosMembresiasProps) => {
  return (
    <Paper sx={{ backgroundColor: "#282833", padding: 3, height: "100%" }}>
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
        Ingresos membresías
      </Typography>
      <Grid container justifyContent="flex-end" spacing={2}>
        <Grid item xs={6}>
          <Box textAlign="center">
            <Typography variant="body2" sx={{ color: "#B4B4B4", mb: 1 }}>
              Mes actual
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff" }}>
              ${mesActual}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box textAlign="center">
            <Typography variant="body2" sx={{ color: "#B4B4B4", mb: 1 }}>
              Mes anterior
            </Typography>
            <Typography variant="h5" sx={{ color: "#fff" }}>
              ${mesAnterior}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default IngresosMembresia;
