import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import LogoutTwoToneIcon from "@mui/icons-material/LogoutTwoTone";
import { logOutUser } from "../../../reducers/userSlice";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const intModel = [
  { name: "CROWD AND COUNTING DETECTION", serialno: 1 },
  {
    name: "QUEUE ANALYSIS AND LENGTH DETECTION",
    serialno: 2,
  },
  {
    name: "NO PPE KIT DETECTION",
    serialno: 3,
  },
  {
    name: "PERIMETER / INTRUSION DETECTION",
    serialno: 4,
  },
  {
    name: "BOUNDARY LOITERING DETECTION",
    serialno: 5,
  },
  {
    name: "PEOPLE COUNTING",
    serialno: 6,
  },
  {
    name: "ABONDONED OBJECT DETECTION",
    serialno: 7,
  },
  {
    name: "OBJECT REMOVAL DETECTION",
    serialno: 8,
  },
  {
    name: "CAMERA TAMPERING SETECTION",
    serialno: 9,
  },
  {
    name: "ARMED PERSON DETECTION",
    serialno: 10,
  },
  {
    name: "VIDEO BASED FIRE DETECTION",
    serialno: 11,
  },
  {
    name: "HUMAN PATTERN RECOGNITION",
    serialno: 12,
  },
  {
    name: "ANPR / LPR",
    serialno: 13,
  },
  {
    name: "STOPPED VEHICLE DETECTION",
    serialno: 14,
  },
  {
    name: "WRONG WAY DETECTION",
    serialno: 15,
  },
  {
    name: "SPEED DETECTION",
    serialno: 16,
  },
  {
    name: "NO HELMET DETECTION",
    serialno: 17,
  },
  {
    name: "DEBRIS AND GARBAGE DETECTION",
    serialno: 18,
  },
  {
    name: "TV AND LOGO DETECTION",
    serialno: 19,
  },
  {
    name: "INSURANCE PROFILING FOR DAMAGE DETECTION IN VEHICLE",
    serialno: 20,
  },
];
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

export default function IntelligentModel() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  return (
    <div>
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
            Azranta
          </Typography>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Intelligent Models Section
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
      <button
        style={{
          marginTop: "100px",
          marginLeft: "150px",
          width: "200px",
          paddingBlock: "10px",
          border: "none",
          backgroundColor: "#433D8B",
          color: "white",
          borderRadius: "10px",
          cursor: "pointer",
        }}
        onClick={() => navigate("/dashboard")}
      >
        ◀︎ Back To Dashboard
      </button>
      <div
        style={{
          marginInline: "auto",
          width: "60vw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,auto)",
            gridTemplateRows: "repeat(20,auto)",
            fontWeight: "800",
            rowGap: "2px",
            marginTop: "30px",
          }}
        >
          <span>Model No.</span>
          <span>Mode Name</span>
          <span
            style={{
              textAlign: "end",
            }}
          >
            Choose any one{" "}
          </span>
        </div>
        {intModel.map((a, i) => (
          <Section key={a.serialno} serialno={a.serialno}>
            {a.name}
          </Section>
        ))}
      </div>
    </div>
  );
}

function Section({ serialno, children }) {
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("#3EC70B");
  let buttonStyle = {
    width: "125px",
    textAlign: "center",
    marginLeft: "0",
    border: "none",
    backgroundColor: color,
    color: "white",
    paddingBlock: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  };
  let newButton = {
    width: "125px",
    textAlign: "center",
    marginLeft: "0",
    border: "none",
    backgroundColor: "red",
    color: "white",
    paddingBlock: "10px",
    borderRadius: "10px",
    cursor: "pointer",
  };
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,auto)",
          gridTemplateRows: "repeat(20,auto)",

          rowGap: "2px",
        }}
      >
        <span>{serialno}</span>
        <span>{children}</span>
        <div
          style={{
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button
            style={active ? buttonStyle : newButton}
            onMouseEnter={() => setColor("#059212")}
            onMouseLeave={() => setColor("#3EC70B")}
            onClick={() => setActive(() => !active)}
          >
            {active ? "Activated" : "Deactivated"}
          </button>
        </div>
      </div>
    </>
  );
}
