import React from "react";
import { Box } from "@mui/system";
import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid";
import VideoItem from "../VideoItem";
import { useSelector } from "react-redux";

export default function VideoArea(props) {
  const cameras = useSelector((state) => state.camera);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "8px",
        flexWrap: "wrap",
        marginInline: -20,
      }}
    >
      {cameras?.cameras.map((videoClip) => {
        return (
          <div key={videoClip?.id}>
            <VideoItem videoClip={videoClip} index={videoClip?.id} />
          </div>
        );
      })}
      {cameras?.cameras?.length === 0 && (
        <div style={{ paddingLeft: 40, paddingTop: 20, color: "red" }}>
          <h3 style={{ maginBottom: 0 }}>No any cameras found</h3>
          <p style={{ color: "black" }}>
            Add cameras by clicking the above option.
          </p>
        </div>
      )}
    </div>
  );
}
