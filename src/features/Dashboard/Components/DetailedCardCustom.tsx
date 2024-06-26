import { Box, Grid, Paper, Typography } from "@mui/material";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";

interface DetailedCardProps {
  title: string;
  icon: "rocket" | "meditation";
  hours?: string | number;
  minutes?: string | number;
}

const DetailedCard = ({ title, icon, hours, minutes }: DetailedCardProps) => {
  return (
    <Paper
      sx={{
        backgroundColor: "#7165E3",
        padding: 2,
        borderRadius: 2,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
        {icon === "rocket" ? (
          <RocketLaunchIcon
            sx={{ color: "white", fontSize: 24, marginRight: 1 }}
          />
        ) : (
          <SelfImprovementIcon
            sx={{ color: "white", fontSize: 24, marginRight: 1 }}
          />
        )}
        <Typography
          variant="subtitle1"
          sx={{ color: "white", fontWeight: "bold" }}
        >
          {title}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ color: "white" }}>
            H: {hours || ""}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2" sx={{ color: "white" }}>
            M: {minutes || ""}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default DetailedCard;
