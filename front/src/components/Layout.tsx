import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  Add,
  CalendarMonth,
  Home as HomeIcon,
} from "@mui/icons-material";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

const drawerWidth = 240;

export default function Layout() {
  const location = useLocation();

  const menuItems = [
    {
      text: "ホーム",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      text: "予定一覧",
      path: "/events",
      icon: <CalendarMonth />,
    },
    {
      text: "予定登録",
      path: "/events/new",
      icon: <Add />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) =>
            theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6">
            予定管理
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
              />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
