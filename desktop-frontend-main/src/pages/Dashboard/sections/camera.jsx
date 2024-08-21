import React, { useState } from "react";
import "@fontsource/inter";
import { Box, Stack } from "@mui/material";
import VideoArea from "../../../components/VideoArea";
import SettingsMenu from "../../../components/SettingsMenu";
import HeightBox from "../../../components/HeightBox";
import ToggleBtn from "../../../components/ToggleBtn";
import api from "../../../api";
import { useDispatch, useSelector } from "react-redux";
import { updateSystemRunningState } from "../../../reducers/userSlice";
import { updateAllCameraRunningStatus } from "../../../reducers/cameraSlice";
import SnackBarComponent from "../../../components/SnackBarComponent";
import { useNavigate } from "react-router-dom";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { logOutUser } from "../../../reducers/userSlice";
import { Button } from "@mui/material";

import { Helmet } from "react-helmet";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
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

export default function CameraSection() {
  const userState = useSelector((state) => state.user);
  const cameraState = useSelector((state) => state.camera);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [systemState, setSystemState] = useState(
    userState?.CCTV_System?.status
  );
  const [loading, setLoading] = useState(false);
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });

  async function changeSystemMonitoringStatus() {
    var newState = systemState === "RUNNING" ? "STOP" : "RUNNING";
    setLoading(true);
    try {
      const response = await api.cctv.changeMonitoringStatus(
        { newStatus: newState, systemId: userState?.CCTV_System?.id },
        userState?.token
      );
      if (response?.data?.status === 200) {
        setSystemState(newState);
        dispatch(updateAllCameraRunningStatus(newState));
        dispatch(updateSystemRunningState(newState));
      } else {
        // Error occured
        setSnackMessage({
          type: "error",
          message: "Error occured while changing the status",
        });
        setOpenSnackBar(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setSnackMessage({ type: "error", message: "A network error occured" });
      setOpenSnackBar(true);
    }
    setLoading(false);
  }

  return (
    <div
      style={{
        overflowX: "hidden",
        overflowY: "scroll",
        margin: -10,
      }}
    >
      <Helmet>
        <style>{"body { background-color:black"}</style>
      </Helmet>
      <CssBaseline />
      <AppBar
        position="absolute"
        sx={{
          width: "90vw",
          right: "5%",
          top: "5px",
          borderRadius: "20px",
        }}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed

            backgroundColor: "#433D8B",
            // backgroundImage: "linear-gradient(#0E86D4, #68BBE3);",
            borderRadius: "20px",
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            color="white"
            noWrap
            sx={{
              flexGrow: 1,
              fontFamily: "Roboto Condensed, sans-serif",
              fontWeight: "800",
            }}
          >
            Video Surveillance
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1.2 }}
          >
            Camera Section
          </Typography>
          <Button
            variant="contained"
            // color="secondary"
            style={{ textTransform: "none" }}
            onClick={() => {
              dispatch(logOutUser());
            }}
            sx={{
              borderRadius: "5px",
              backgroundColor: "red",
              "&:hover": {
                backgroundColor: "rgba(255,0,0,0.5)",
              },
            }}
          >
            <LogoutTwoToneIcon />
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          margin: "5%",
          marginTop: "7%",
          backgroundColor: "rgba(255,255,255,0.08)",
          borderRadius: "10px",
          boxShadow: "1px 1px 80px 10px rgba(67,61,139,0.5)",
        }}
      >
        <SnackBarComponent
          type={snackMessage.type}
          message={snackMessage.message}
          open={openSnackBar}
          setOpen={setOpenSnackBar}
        />
        <Stack direction="column" spacing={5}>
          <HeightBox height={2} />
          <div
            style={{
              paddingLeft: 40,
              justifyContent: "center",
            }}
          >
            <Stack direction="row" spacing={5} alignItems="center">
              <button
                style={{
                  marginLeft: "40px",
                  width: "200px",
                  paddingBlock: "10px",
                  border: "none",
                  backgroundColor: "#433D8B",
                  color: "white",
                  borderRadius: "10px",
                }}
                onClick={() => navigate("/dashboard")}
              >
                ◀︎ Back To Dashboard
              </button>
              <div>
                <ToggleBtn
                  state={systemState}
                  loading={loading}
                  disabled={cameraState?.cameras.length === 0}
                  setState={(status) => {
                    changeSystemMonitoringStatus();
                  }}
                />
              </div>
              <SettingsMenu />
            </Stack>
          </div>
          <div style={{ paddingLeft: 40, paddingRight: 40 }}>
            <VideoArea alignment={"row"} />
          </div>
          <HeightBox height={10} />
        </Stack>
      </Box>
    </div>
  );
}
