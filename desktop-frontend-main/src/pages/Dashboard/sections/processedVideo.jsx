import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import TextField from "@mui/material/TextField";
import * as moment from "moment";
import api from "../../../api";
import RecordVideoItem from "../../../components/RecordVideoItem";
import HeightBox from "../../../components/HeightBox";
import { useNavigate } from "react-router-dom";

export default function ProcessedVideo() {
  const today = new Date();
  const [value, setValue] = useState(moment(today).format("YYYY-MM-DD"));
  const [recordVideos, setRecordVideos] = useState([]);
  const navigate = useNavigate();

  async function getRecordIds(date) {
    try {
      const response = await api.local_video.getRecordVides(date);
      console.log("Video response: ", response);
      if (response?.status === 200) {
        setRecordVideos(response?.data?.data);
      } else {
        setRecordVideos([]);
      }
    } catch (error) {
      setRecordVideos([]);
    }
  }

  useEffect(() => {
    getRecordIds(value);
  }, []);

  return (
    <div style={{ paddingLeft: 20 }}>
      <button
        style={{
          marginTop: "100px",
          marginLeft: "2px",
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
      <h3>Recorded Videos</h3>
      <Stack direction="row" alignItems="center" spacing={3}>
        <h4>Select date : </h4>
        <TextField
          type="date"
          value={value}
          onChange={(event) => {
            setValue(event?.target?.value);
            getRecordIds(event?.target?.value);
          }}
        />
      </Stack>
      <HeightBox height={50} />
      <Grid container spacing={5} justifyContent="center">
        {recordVideos.map((item) => (
          <RecordVideoItem id={item[0]} date={item[1]} />
        ))}
        {recordVideos.length === 0 && (
          <p style={{ color: "red" }}>No any recorded videos found</p>
        )}
      </Grid>
    </div>
  );
}
