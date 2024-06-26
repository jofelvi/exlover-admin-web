import { Grid } from "@mui/material";
import CustomCard from "../Components/SimpleCardCustoms.tsx";
import DetailedCard from "../Components/DetailedCardCustom.tsx";
import IngresosMembresia from "../Components/IngresosMembresia.tsx";
import AnalisisVentas from "../Components/AnalisisVentasCustom.tsx";
import WorldMap from "../Components/WorldMap.tsx";
import { useGetDashboard } from "../services/DashboardServices.ts";

const Dashboard = () => {
  const { data } = useGetDashboard();

  return (
    <div>
      <h1>Dashboard</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard
            icon="people"
            title="TOTAL REGISTRADOS"
            value={data?.totalRegister || 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CustomCard
            icon="gift"
            title="TOTAL MEMBRESÍAS"
            value={data?.totalMembership || 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailedCard
            title="SUPERANDO AL EX"
            icon="rocket"
            hours={data?.totalSuperacionMen || 0}
            minutes={data?.totalSuperacionWomen || 0}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DetailedCard
            title="MEDITACIÓN"
            icon="meditation"
            hours={data?.totalMeditacionMen || 0}
            minutes={data?.totalMeditacionWomen || 0}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <IngresosMembresia
            mesActual={data?.membershipActual || 0}
            mesAnterior={data?.membershipAnterior || 0}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <AnalisisVentas
            mesActual={{ mensual: "", anual: "" }}
            mesAnterior={{ mensual: "", anual: "" }}
            haceMeses={{ mensual: "", anual: "" }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <WorldMap />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
