import React, { useState } from "react";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import SettingsIcon from "@mui/icons-material/Settings";
// import { IconButton } from "@mui/material";
import AddCameraForm from "../AddCameraForm";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemIcon from "@mui/material/ListItemIcon";
import "./style.css";

export default function SettingsMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpenDialog(true);
    handleClose();
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AddCameraForm openDialog={openDialog} setOpenDialog={setOpenDialog} />
      <button
        className="add-camera"
        id="basic-button"
        aria-controls={open ? "settings-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span style={{ fontWeight: "800" }}> Add Camera</span>
      </button>
    </div>
  );
}
