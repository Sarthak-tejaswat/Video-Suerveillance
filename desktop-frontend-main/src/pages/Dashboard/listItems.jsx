import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import SnowshoeingIcon from "@mui/icons-material/Snowshoeing";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import VideocamIcon from "@mui/icons-material/Videocam";
import { DASHBOARD_ROUTES } from "../../constants";
import { Box } from "@mui/material";

import SmartToyIcon from "@mui/icons-material/SmartToy";

export default function MainListItems({ setOpen }) {
  const navigate = useNavigate();

  const boxStyle = {
    width: "100px",
    borderRadius: "10px",
    display: "flex",
    flexDirection: "column",
    height: "100px",
    marginTop: "20vh",
    // marginBlock: "auto",
    marginInline: "10px",
    paddingBlock: "20px",
    backgroundColor: "rgba(255,255,255,0.1)",
    "&:hover": {
      backgroundColor: "#17153B",
      transform: "scale(1.08)",
    },
  };

  const iconStyle = {
    marginInline: "auto",
  };
  function routeToPage(page) {
    navigate(`/dashboard/${page}`);
  }

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          return routeToPage(DASHBOARD_ROUTES.CAMERA);
          setOpen(false);
        }}
        sx={boxStyle}
      >
        <ListItemIcon>
          <Box sx={iconStyle}>
            <OndemandVideoIcon sx={{ color: "white" }} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Cameras" sx={{ color: "white" }} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          return routeToPage(DASHBOARD_ROUTES.INTRUSIONS);
          setOpen(false);
        }}
        sx={boxStyle}
      >
        <ListItemIcon>
          <Box sx={iconStyle}>
            <SnowshoeingIcon sx={{ color: "white" }} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Intrusions" sx={{ color: "white" }} />
      </ListItemButton>
      <ListItemButton
        onClick={() => routeToPage(DASHBOARD_ROUTES.PROCESSEDVIDEOS)}
        sx={boxStyle}
      >
        <ListItemIcon>
          <Box sx={iconStyle}>
            <VideocamIcon sx={{ color: "white" }} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Detected Intrusion" sx={{ color: "white" }} />
      </ListItemButton>
      {/* <ListItemButton // added something
        onClick={() => {
          return routeToPage(DASHBOARD_ROUTES.HISTORY);
          setOpen(false);
        }}
        sx={boxStyle}
      >
        <ListItemIcon>
          <Box sx={iconStyle}>
            <HistoryIcon sx={{ color: "white" }} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="History" sx={{ color: "white" }} />
      </ListItemButton> */}
      <ListItemButton
        onClick={() => {
          return routeToPage(DASHBOARD_ROUTES.SETTINGS);
          setOpen(false);
        }}
        sx={boxStyle}
      >
        <ListItemIcon>
          <Box sx={iconStyle}>
            <SettingsIcon sx={{ color: "white" }} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Settings" sx={{ color: "white" }} />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          return routeToPage(DASHBOARD_ROUTES.MODEL);
          setOpen(false);
        }}
        sx={boxStyle}
      >
        <ListItemIcon>
          <Box sx={iconStyle}>
            <SmartToyIcon sx={{ color: "white" }} />
          </Box>
        </ListItemIcon>
        <ListItemText primary="Intelligent Model" sx={{ color: "white" }} />
      </ListItemButton>
    </React.Fragment>
  );
}
