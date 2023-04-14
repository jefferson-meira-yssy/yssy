import { AccountCircle, Menu as MenuIcon } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { CSSObject, Theme, styled, useTheme } from "@mui/material/styles";
import { MouseEvent, ReactNode, useState } from "react";

import Logo from "../../assets/YSSY_traco_negativo_rgb.png";
import SidebarMenu from "../SidebarMenu";
// import LogoAlt from "../../assets/logoAlt.svg";

const drawerWidth = 240;
1;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        open={open}
        color="transparent"
        sx={{ boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6">
            Dashboard
          </Typography>

          <Box sx={{ ml: "auto" }}>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Perfil</MenuItem>
              <MenuItem onClick={handleClose}>Desconectar</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={open}
        sx={{
          "& .MuiPaper-root": {
            background: theme.palette.primary.main,
            color: theme.palette.common.white,
          },
        }}
      >
        <DrawerHeader>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: theme.palette.common.white, py: 0 }}
          >
            <MenuIcon />
          </IconButton>

          <Box
            sx={{
              width: "132px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",

              visibility: open ? "visible" : "hidden",
            }}
          >
            <img
              alt="Yssy"
              src={Logo}
              style={{
                width: "132px",
                height: "35px",
              }}
            />

            {/* <img
              alt="Yssy"
              src={LogoAlt}
              style={{
                width: "132px",
                height: "35px",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "8px",
                  color: theme.palette.common.white,
                }}
              >
                developed by
              </Typography>
              <Box>
                <img
                  alt="Yssy Marca"
                  src={Logo}
                  style={{
                    width: "46px",
                    height: "17px",
                  }}
                />
              </Box>
            </Box>*/}
          </Box>
        </DrawerHeader>
        <SidebarMenu />
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          minHeight: "100vh",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
        }}
      >
        <Box>
          <DrawerHeader />
          <main>{children}</main>
        </Box>
      </Box>
    </Box>
  );
}
