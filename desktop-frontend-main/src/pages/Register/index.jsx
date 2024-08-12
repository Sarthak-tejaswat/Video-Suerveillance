import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import REGISTER_IMAGE from "../../assets/images/loginBG.svg";
import { Stack } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import "@fontsource/inter";
import { registerUser, updateSystemStatus } from "../../reducers/userSlice";
import { Helmet } from "react-helmet";
import api from "../../api";

const CustomTextField = styled(TextField)({
  width: "100%",
});

const CustomButton = styled(Button)(({ theme }) => ({
  width: "100%",
  backgroundColor: "#6C63FF",
  fontFamily: "Inter",
  fontSize: 15,
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "#5C63FF",
  },
}));

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("First Name"),
  lastName: Yup.string().required().label("Last Name"),
  email: Yup.string().required().email().label("Email").min(3).max(36),
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
    .label("Password")
    .matches(/\d+/, "Password should contain at least one number")
    .matches(
      /[a-z]+/,
      "Password should contain at least one lowercase character"
    )
    .matches(
      /[A-Z]+/,
      "Password should contain at least one uppercase character"
    )
    .matches(
      /[!@#$%^&*()-+]+/,
      "Password should contain at least one special character"
    ),
  confirmPassword: Yup.string()
    .required()
    .label("Confirm Password")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Register() {
  const navigate = useNavigate();
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);

  useEffect(() => {
    if (userState?.email) {
      navigate("/");
    }
  }, [userState?.email, navigate]);

  useEffect(() => {
    if (userState?.auth && !userState?.CCTV_System) {
      createSystem();
    } else if (userState?.auth && userState?.CCTV_System?.id) {
      setLoading(false);
      navigate("/");
    } else if (userState?.dataStatus === "error") {
      setLoading(false);
      setSnackMessage({ type: "error", message: "Error occurred!" });
      setOpenSnackBar(true);
    }
  }, [userState, navigate]);

  const createSystem = async () => {
    if (!userState?.token) return;

    try {
      const response = await api.cctv.createSystem(
        { cameraCount: 0 },
        userState?.token
      );
      if (response?.data?.status === 201) {
        dispatch(updateSystemStatus(response?.data?.data));
        await api.local_camera.sendSystemId(
          response?.data?.data?.CCTV_System?.id
        );
      } else {
        setSnackMessage({
          type: "error",
          message: "Error occurred while creating the system",
        });
        setOpenSnackBar(true);
      }
    } catch (error) {
      setSnackMessage({ type: "error", message: "A network error occurred" });
      setOpenSnackBar(true);
    }
  };

  const signUpUser = async (user) => {
    setLoading(true);

    if (userState?.email) {
      navigate("/");
      return;
    }

    try {
      await dispatch(registerUser(user)).unwrap();
    } catch (error) {
      setSnackMessage({ type: "error", message: error.message });
      setOpenSnackBar(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <style>
          {"body { background-image: url(" +
            REGISTER_IMAGE +
            "); overflow: hidden; background-repeat: no-repeat; background-size: cover; }"}
        </style>
      </Helmet>
      <Stack direction="column">
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Paper
            variant="outlined"
            sx={{
              minWidth: 400,
              width: "30%",
              position: "absolute",
              top: "10%",
              left: "35%",
            }}
          >
            <div style={{ paddingLeft: "10%", paddingTop: 50, width: "80%" }}>
              <h2
                style={{
                  fontSize: 36,
                  fontFamily: "Inter",
                  margin: 0,
                  alignSelf: "center",
                }}
              >
                Register With Us
              </h2>
              <SnackBarComponent
                type={snackMessage.type}
                message={snackMessage.message}
                open={openSnackBar}
                setOpen={setOpenSnackBar}
              />
              <HeightBox height={30} />
              <Formik
                initialValues={{
                  firstName: "",
                  lastName: "",
                  email: "",
                  password: "",
                  confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  const user = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    password: values.password,
                  };
                  signUpUser(user);
                }}
              >
                {({ errors, handleSubmit, handleChange, touched }) => (
                  <>
                    <CustomTextField
                      label="First Name"
                      id="firstName"
                      variant="outlined"
                      error={errors.firstName && touched.firstName}
                      helperText={
                        touched.firstName && errors.firstName
                          ? errors.firstName
                          : ""
                      }
                      onChange={handleChange("firstName")}
                    />
                    <CustomTextField
                      label="Last Name"
                      id="lastName"
                      variant="outlined"
                      error={errors.lastName && touched.lastName}
                      helperText={
                        touched.lastName && errors.lastName
                          ? errors.lastName
                          : ""
                      }
                      onChange={handleChange("lastName")}
                    />
                    <CustomTextField
                      label="Email"
                      id="email"
                      variant="outlined"
                      error={errors.email && touched.email}
                      helperText={
                        touched.email && errors.email ? errors.email : ""
                      }
                      onChange={handleChange("email")}
                    />
                    <CustomTextField
                      label="Password"
                      id="password"
                      variant="outlined"
                      type="password"
                      error={errors.password && touched.password}
                      helperText={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                      onChange={handleChange("password")}
                    />
                    <CustomTextField
                      label="Confirm Password"
                      id="confirmPassword"
                      variant="outlined"
                      type="password"
                      error={errors.confirmPassword && touched.confirmPassword}
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : ""
                      }
                      onChange={handleChange("confirmPassword")}
                    />
                    <Stack direction="row">
                      <Button
                        sx={{ width: "100%" }}
                        variant="text"
                        style={{ textTransform: "none" }}
                        onClick={() => navigate("/")}
                      >
                        Sign In
                      </Button>
                      <CustomButton
                        type="submit"
                        variant="contained"
                        size="large"
                        onClick={handleSubmit}
                        disabled={loading}
                      >
                        {loading ? <CircularProgress /> : "Register"}
                      </CustomButton>
                    </Stack>
                  </>
                )}
              </Formik>
              <HeightBox height={15} />
            </div>
          </Paper>
        </Stack>
        <HeightBox height={15} />
      </Stack>
    </div>
  );
}
