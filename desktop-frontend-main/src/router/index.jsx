import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Register from "../pages/Register";
import ViewNotification from "../pages/ViewNotification";
import ResetPassword from "../pages/ResetPW";
import CameraSection from "../pages/Dashboard/sections/camera";
import IntelligentModel from "../pages/Dashboard/sections/model";
import IntrusionSection from "../pages/Dashboard/sections/intrusion";
import Settings from "../pages/Dashboard/sections/settings";
import ProcessedVideo from "../pages/Dashboard/sections/processedVideo";

export default function Router() {
  const [openPane, setOpenPane] = React.useState();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<Dashboard openPane={openPane} setOpenPane={setOpenPane} />}
        />
        <Route path="/dashboard/camera" element={<CameraSection />} />
        <Route path="/dashboard/intrusion" element={<IntrusionSection />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        <Route path="/dashboard/processed" element={<ProcessedVideo />} />

        <Route
          path="/dashboard/intelligentModel"
          element={<IntelligentModel />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/resetPW" element={<ResetPassword />} />

        <Route
          path="/viewNotification/:intrusionId/:time"
          element={<ViewNotification />}
        />
      </Routes>
    </BrowserRouter>
  );
}
