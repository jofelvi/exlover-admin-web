import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

type IconType = "people" | "gift";

interface CustomCardProps {
  icon: IconType;
  title: string;
  value: string | number;
}

const CustomCard: React.FC<CustomCardProps> = ({ icon, title, value }) => {
  return (
    <Paper
      sx={{
        backgroundColor: "#7165E3",
        padding: "12px 16px",
        display: "flex",
        alignItems: "center",
        borderRadius: 1,
        width: "100%",
      }}
    >
      <Box
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.2)",
          borderRadius: "4px",
          padding: "8px",
          marginRight: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon === "people" ? (
          <PeopleIcon sx={{ color: "white", fontSize: 24 }} />
        ) : (
          <CardGiftcardIcon sx={{ color: "white", fontSize: 24 }} />
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: "white",
            fontWeight: 500,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            lineHeight: 1,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: "white",
            fontWeight: 700,
            fontSize: "1.25rem",
            marginTop: "4px",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Paper>
  );
};

export default CustomCard;
