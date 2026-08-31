import {
  useState,
} from "react";

import {
  AppBar,
  Box,
  Drawer,
  IconButton,
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
  Menu,
} from "@mui/icons-material";

import {
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";

const drawerWidth = 240;

export default function Layout() {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(
      (current) => !current
    );
  };

  const handleMobileDrawerClose = () => {
    setMobileOpen(false);
  };

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

  const drawerContent = (
    <>
      <Toolbar />

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={
              location.pathname ===
              item.path
            }
            onClick={handleMobileDrawerClose}
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
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) =>
            theme.zIndex.drawer + 1,

          width: {
            md: `calc(100% - ${drawerWidth}px)`,
          },

          ml: {
            md: `${drawerWidth}px`,
          },
        }}
      >
        <Toolbar
          sx={{
            gap: 1,
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            aria-label="メニューを開く"
            onClick={handleDrawerToggle}
            sx={{
              display: {
                xs: "inline-flex",
                md: "none",
              },
            }}
          >
            <Menu />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
          >
            予定管理
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: {
            xs: "block",
            md: "none",
          },

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: {
            xs: 2,
            sm: 3,
          },
          bgcolor: "#f5f5f5",
          minHeight: "100vh",
          width: {
            xs: "100%",
            md: `calc(100% - ${drawerWidth}px)`,
          },
        }}
      >
        <Toolbar />

        <Outlet />
      </Box>
    </Box>
  );
}
