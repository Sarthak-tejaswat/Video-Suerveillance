import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import MainListItems from "./listItems";
import { Button } from "@mui/material";
import { DASHBOARD_ROUTES } from "../../constants";
import CameraSection from "./sections/camera";
import IntrusionSection from "./sections/intrusion";
import Settings from "./sections/settings";
import ProcessedVideo from "./sections/processedVideo";
import HistorySection from "./sections/history";
import { logOutUser } from "../../reducers/userSlice";
import { getCameras } from "../../reducers/cameraSlice";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { convertLength } from "@mui/material/styles/cssUtils";
import IntelligentModel from "./sections/model";
import { Helmet } from "react-helmet";
import Camera_Image from "../../assets/images/Camera.jpeg";
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export default function Dashboard({ openPane, setOpenPane }) {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const disptach = useDispatch();
  const [open, setOpen] = React.useState(true);

  const location = useLocation();

  React.useEffect(() => {
    if (!userState?.auth) {
      navigate("/");
    } else {
      if (userState) {
        disptach(
          getCameras({
            systemId: userState?.CCTV_System?.id,
            token: userState?.token,
          })
        );
      }
    }
  }, [userState]);

  React.useEffect(() => {
    const params = location.pathname.split("/");

    if (params.length === 3) {
      const subComponent = params[2];
      switch (subComponent) {
        case DASHBOARD_ROUTES.CAMERA:
          setOpenPane(<CameraSection />);

          break;
        case DASHBOARD_ROUTES.INTRUSIONS:
          setOpenPane(<IntrusionSection />);

          break;
        case DASHBOARD_ROUTES.SETTINGS:
          setOpenPane(<Settings />);

          break;
        case DASHBOARD_ROUTES.PROCESSEDVIDEOS:
          setOpenPane(<ProcessedVideo />);

          break;
        case DASHBOARD_ROUTES.HISTORY:
          setOpenPane(<HistorySection />);

          break;
        case DASHBOARD_ROUTES.MODEL:
          setOpenPane(<IntelligentModel />);

          break;
        default:
          break;
      }
    }
  }, [location]);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          width: "100vw",
          height: "90vh",
          background: "url()",
        }}
      >
        <Helmet>
          <style>
            {"body { background-image: " +
              `url(${Camera_Image})` +
              ";overflow: hidden; background-repeat: no-repeat; background-size:cover;}"}
          </style>
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
              Dashboard
            </Typography>
            <Button
              variant="contained"
              // color="secondary"
              style={{ textTransform: "none" }}
              onClick={() => {
                disptach(logOutUser());
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
        {/* <Drawer
        variant="permanent"
        open={open}
        sx={{
          marginBlock: "70px",
          overflowX: "none",
        }}
      >
        <List component="nav">
          <IconButton
            onClick={toggleDrawer}
            sx={{
              width: "100%",
              borderRadius: "10px",
              ...(!open && { display: "none" }),
              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.05)",
              },
            }}
          >
            <ChevronLeftIcon
              color="secondary"
              sx={{
                marginLeft: "50px",
              }}
            />
            <Typography
              component="h1"
              variant="h6"
              color="red"
              noWrap
              sx={{
                flexGrow: 1,
                marginRight: "75px",
              }}
            >
              Close
            </Typography>
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginLeft: "12px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon color="inherit" />
          </IconButton>
          <MainListItems />
        </List>
      </Drawer> */}

        {/* ---------------Side pane and open pane separation ---------------- */}

        {open ? (
          <div
            style={{
              display: "flex",
              width: "80vw",
              height: "100vh",
              margin: "auto",
              flexWrap: "wrap",
            }}
          >
            <MainListItems setOpen={setOpen} />
          </div>
        ) : (
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
              boxShadow: "inset 0px 1px 10px 2px rgba(0,0,0,0.3)",
            }}
          >
            <Toolbar sx={{ boxShadow: " 0px 2px 10px 2px rgba(0,0,0,0.3)" }} />

            {openPane}
          </Box>
        )}
      </Box>
      <footer
        style={{
          borderTop: "1px solid white",
          textAlign: "center",
          color: "white",
        }}
      >
        <p>©Azranta . All Rights Reserved</p>
      </footer>
    </>
  );
}
