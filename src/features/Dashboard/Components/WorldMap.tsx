import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Box, Typography } from "@mui/material";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface MapData {
  markerOffset: number;
  name: string;
  coordinates: [number, number];
}

const markers: MapData[] = [
  {
    markerOffset: -15,
    name: "Mexico",
    coordinates: [-99.12708809391069, 19.427491857710578],
  },
];

const WorldMap: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <Box
      sx={{
        backgroundColor: "#2b2d3e",
        padding: 2,
        borderRadius: 2,
        color: "white",
        width: "100%",
        height: "400px", //  la altura
      }}
    >
      <Typography variant="h6" gutterBottom>
        Mapa global usuarios TILA
      </Typography>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 200, //  la escala
          center: [0, 30], //  centro del mapa
        }}
        style={{
          width: "100%",
          height: "90%", // espacio para el título
        }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseEnter={() => {
                  const { NAME } = geo.properties;
                  setTooltipContent(`${NAME}`);
                }}
                onMouseLeave={() => {
                  setTooltipContent("");
                }}
                style={{
                  default: {
                    fill: "#7165E3",
                    outline: "none",
                    stroke: "#2b2d3e",
                    strokeWidth: 0.5,
                  },
                  hover: {
                    fill: "#5d52c9",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#4a41a0",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
        {markers.map(({ name, coordinates, markerOffset }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={4} fill="#F00" stroke="#fff" strokeWidth={2} />
            <text
              textAnchor="middle"
              y={markerOffset}
              style={{
                fontFamily: "system-ui",
                fill: "#fff",
                fontSize: "10px",
              }}
            >
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
      {tooltipContent && (
        <Box
          sx={{
            position: "absolute",
            bottom: 10,
            left: 10,
            background: "rgba(0,0,0,0.5)",
            padding: 1,
            borderRadius: 1,
          }}
        >
          <Typography variant="body2">{tooltipContent}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WorldMap;
