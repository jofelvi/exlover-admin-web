import React from "react";
import { createTheme, styled, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MeditationIcon from "@mui/icons-material/SelfImprovement";
import NightlightIcon from "@mui/icons-material/Nightlight";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import { Link, Outlet } from "react-router-dom";
import logoTila from "../../../assets/logo-sm.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppDispatch } from "../../../store/HooksRedux.ts";
import { logout } from "../../Auth/slices/authSlice.ts";

const drawerWidth = 240;
const theme = createTheme({
  palette: {
    primary: {
      main: "#282833",
    },
    background: {
      default: "#1E1E28",
      paper: "#282833",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B4B4B4",
    },
  },
});

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
  backgroundColor: theme.palette.background.default,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: "#36394C",
  boxShadow: "none",
  borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function LayoutMainPrivate() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useAppDispatch();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>

            <Link to="/">
              <img width={30} src={logoTila} alt="exlover" />{" "}
            </Link>
            <Box sx={{ ml: "auto" }}>
              {" "}
              <IconButton color="inherit" onClick={() => dispatch(logout())}>
                <LogoutIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#36394C",
              color: theme.palette.text.primary,
              borderRight: "none",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose} sx={{ color: "white" }}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.12)" }} />
          <List>
            {[
              {
                text: "Dashboard",
                icon: <DashboardIcon />,
                route: "dashboard",
              },
              { text: "Usuarios", icon: <PeopleIcon />, route: "/users" },
              {
                text: "Notificaciones",
                icon: <NotificationsIcon />,
                route: "/notifications",
              },
              {
                text: "Meditaciones",
                icon: <MeditationIcon />,
                route: "/meditacions",
              },
              { text: "Duerme", icon: <NightlightIcon />, route: "/duerme" },
              { text: "Sonidos", icon: <MusicNoteIcon />, route: "/sounds" },
              { text: "Membresía", icon: <CardMembershipIcon />, route: "" },
            ].map((item) => (
              <ListItem key={item.text} disablePadding>
                <Link to={item.route}>
                  <ListItemButton>
                    <ListItemIcon sx={{ color: theme.palette.text.primary }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={{ color: theme.palette.text.secondary }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Main
          style={{ backgroundColor: "#222736", height: "100vh" }}
          open={open}
        >
          <DrawerHeader />
          <div>
            <Outlet />
          </div>
        </Main>
      </Box>
    </ThemeProvider>
  );
}
