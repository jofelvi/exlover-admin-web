import React from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";

interface AnalisisVentasProps {
  mesActual: { mensual: string; anual: string };
  mesAnterior: { mensual: string; anual: string };
  haceMeses: { mensual: string; anual: string };
}

const AnalisisVentas: React.FC<AnalisisVentasProps> = ({
  mesActual,
  mesAnterior,
  haceMeses,
}: AnalisisVentasProps) => {
  return (
    <Paper sx={{ backgroundColor: "#282833", padding: 3, height: "100%" }}>
      <Typography variant="h6" sx={{ color: "#fff", mb: 2 }}>
        Análisis de ventas
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ color: "#B4B4B4", mb: 1 }}>
            Mes actual
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Mensual: ${mesActual.mensual}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Anual: ${mesActual.anual}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ color: "#B4B4B4", mb: 1 }}>
            Mes anterior
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Mensual: ${mesAnterior.mensual}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Anual: ${mesAnterior.anual}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2" sx={{ color: "#B4B4B4", mb: 1 }}>
            Hace 2 meses
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Mensual: ${haceMeses.mensual}
            </Typography>
            <Typography variant="body1" sx={{ color: "#fff" }}>
              Anual: ${haceMeses.anual}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default AnalisisVentas;
