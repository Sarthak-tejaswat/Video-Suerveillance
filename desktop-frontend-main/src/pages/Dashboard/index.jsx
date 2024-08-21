import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import Typography from "@mui/material/Typography";

import MainListItems from "./listItems";
import { Button } from "@mui/material";
import { DASHBOARD_ROUTES } from "../../constants";
import CameraSection from "./sections/camera";
import IntrusionSection from "./sections/intrusion";
import Settings from "./sections/settings";
import ProcessedVideo from "./sections/processedVideo";

import { logOutUser } from "../../reducers/userSlice";
import { getCameras } from "../../reducers/cameraSlice";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";

import IntelligentModel from "./sections/model";
import UserInfo from "./sections/About";
import Camera_Image from "../../assets/images/Camera.jpeg";
import axios from "axios";
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
  const [users, setUsers] = React.useState([]);
  const [error, setError] = React.useState(null);

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
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/get/users");
        setUsers(response.data);
      } catch (err) {
        setError(err);
      }
    };

    fetchUsers();
  }, []);
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
              ";overflow: hidden; background-repeat: no-repeat; background-size:cover;background-size:100vw 100vh}"}
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

        {/* ---------------Side pane and open pane separation ---------------- */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "50vh",
              width: "50vw",
              padding: "6%",
              paddingTop: "10%",
              color: "white",
            }}
          >
            <h1>
              Welcome, <UserInfo />
            </h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facere
              sequi, a earum expedita minima repellat, tenetur asperiores fugiat
              molestias tempore neque voluptatibus perspiciatis odio explicabo
              veniam sint nobis voluptates eius error ratione adipisci
              molestiae. Quam, atque aliquid illo vel suscipit alias voluptatem
              labore quae modi veritatis doloribus dolore dignissimos velit.
            </p>
          </div>
          {open ? (
            <div
              style={{
                display: "flex",
                width: "100vw",
                height: "50vh",
                paddingInline: "5%",
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
              <Toolbar
                sx={{ boxShadow: " 0px 2px 10px 2px rgba(0,0,0,0.3)" }}
              />

              {openPane}
            </Box>
          )}
        </div>
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
