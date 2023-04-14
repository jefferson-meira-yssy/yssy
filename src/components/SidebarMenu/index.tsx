import { ExitToApp, Leaderboard, Person, Settings } from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { ElementType } from "react";
import { useNavigate } from "react-router-dom";

export default function SidebarMenu() {
  const theme = useTheme();
  const navigate = useNavigate();

  const routes = [
    {
      label: "Home",
      path: "/",
      icon: <Leaderboard />,
    },
    {
      label: "Usuários",
      path: "/profile",
      icon: <Person />,
    },
  ];

  const SidebarMenu = styled(List)<{ component?: ElementType }>({
    "& .MuiTypography-root": {
      fontSize: 14,
    },
    "& .MuiListItemIcon-root": {
      color: theme.palette.common.white,
      minWidth: 0,
      marginRight: 24,
    },
  });

  return (
    <SidebarMenu component="nav">
      {routes.map((item) => (
        <ListItemButton
          key={item.path}
          onClick={() => {
            navigate(item.path);
          }}
          sx={{
            background:
              location.pathname === item.path // eslint-disable-line
                ? theme.palette.secondary.light
                : "none",
            color:
              location.pathname === item.path // eslint-disable-line
                ? theme.palette.primary.main
                : "none",
            "&:hover": {
              background: theme.palette.secondary.light,
              color:
                location.pathname === item.path // eslint-disable-line
                  ? theme.palette.primary.main
                  : theme.palette.primary.main,
              "& svg": {
                fill:
                  location.pathname === item.path // eslint-disable-line
                    ? theme.palette.primary.main
                    : theme.palette.primary.main,
              },
            },
            "& svg": {
              fill:
                location.pathname === item.path // eslint-disable-line
                  ? theme.palette.primary.main
                  : "white",
            },
          }}
        >
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.label} />
        </ListItemButton>
      ))}

      <Divider />

      {["Configurações", "Sair"].map((text, index) => (
        <ListItemButton key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <Settings /> : <ExitToApp />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </SidebarMenu>
  );
}
