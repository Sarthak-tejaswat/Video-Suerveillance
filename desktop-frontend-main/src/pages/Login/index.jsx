import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Formik } from "formik";
import { styled } from "@mui/system";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import LOGIN_IMAGE from "../../assets/images/loginBG.svg";
import { Stack, Typography } from "@mui/material";
import HeightBox from "../../components/HeightBox";
import DialogTitle from "@mui/material/DialogTitle";

import * as Yup from "yup";
import SnackBarComponent from "../../components/SnackBarComponent";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogContentText,
} from "@mui/material";
import { getLocalUser, loginUser } from "../../reducers/userSlice";
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
  email: Yup.string().required().email().label("Email").min(3).max(36),
  password: Yup.string()
    .required()
    .min(8)
    .max(15)
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
    )
    .label("Password"),
});

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState({
    type: "success",
    message: "",
  });
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [openDialog, setOpenDialog] = useState(true);
  const [rechecking, setRechecking] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initializeUser = async () => {
      setLoading(true);
      await checkServer();
      dispatch(getLocalUser());
      setLoading(false);
    };

    initializeUser();
  }, [dispatch]);

  const checkServer = async () => {
    setRechecking(true);
    try {
      const response = await api.local_user.checkServer();
      setOpenDialog(response?.status !== 200);
    } catch (error) {
      setOpenDialog(true);
    }
    setRechecking(false);
  };

  useEffect(() => {
    if (userState?.auth && userState?.CCTV_System?.id) {
      navigate("/dashboard");
    } else if (userState?.dataStatus === "error" || !userState?.auth) {
      setLoading(false);
    }
  }, [userState, navigate]);

  const signInUser = async (data) => {
    if (userState?.email && userState?.email !== data.email) {
      setSnackMessage({
        type: "error",
        message: "You cannot log in to this system",
      });
      setOpenSnackBar(true);
      return;
    }

    setLoading(true);
    try {
      await dispatch(loginUser(data)).unwrap();
    } catch (error) {
      setSnackMessage({
        type: "error",
        message: "Invalid username or password!",
      });
      setOpenSnackBar(true);
    } finally {
      setLoading(false);
    }
  };

  const sendForgotPasswordEmail = async (values) => {
    setLoading(true);
    try {
      const response = await api.user.sendResetPasswordEmail({
        email: values.resetPasswordMail,
      });
      if (response?.data?.status === 200) {
        navigate("/resetPW", {
          state: {
            id: response?.data?.data?.user?.id,
            email: values.resetPasswordMail,
          },
        });
      }
    } catch (error) {
      setSnackMessage({
        type: "error",
        message: "Error sending reset password email",
      });
      setOpenSnackBar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog onClose={handleDialogClose} open={openDialog}>
        <DialogTitle>Server not found</DialogTitle>
        <DialogContent>
          <Typography variant="p">
            Please run Ninety Camera server package to run this
          </Typography>
          <HeightBox height={20} />
          <Stack direction="row" alignItems="center" justifyContent="center">
            <Button
              variant="contained"
              onClick={checkServer}
              disabled={rechecking}
              sx={{ width: 200 }}
            >
              {rechecking ? <CircularProgress /> : "Recheck"}
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <Helmet>
        <style>
          {"body { background-image: " +
            `url(${LOGIN_IMAGE})` +
            "; overflow: hidden; background-repeat: no-repeat; background-size: cover}"}
        </style>
      </Helmet>
      <Paper
        variant="outlined"
        sx={{
          minWidth: 350,
          width: "24%",
          position: "absolute",
          top: "20%",
          left: "38%",
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
            Welcome Back!
          </h2>
          <SnackBarComponent
            type={snackMessage.type}
            message={snackMessage.message}
            open={openSnackBar}
            setOpen={setOpenSnackBar}
          />
          <HeightBox height={10} />
          <Stack direction="column" spacing={2}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={validationSchema}
              onSubmit={signInUser}
            >
              {({ errors, handleSubmit, handleChange, touched }) => (
                <>
                  <CustomTextField
                    label="Email"
                    id="Email"
                    variant="outlined"
                    error={errors.email && touched.email}
                    helperText={touched.email ? errors.email : ""}
                    onChange={handleChange("email")}
                  />
                  <CustomTextField
                    label="Password"
                    id="Password"
                    variant="outlined"
                    type="password"
                    error={errors.password && touched.password}
                    helperText={touched.password ? errors.password : ""}
                    onChange={handleChange("password")}
                  />
                  <Button
                    sx={{ width: "100%" }}
                    variant="text"
                    style={{ textTransform: "none" }}
                    onClick={() => setOpen(true)}
                  >
                    Forgot Password?
                  </Button>
                  <Stack direction="row" spacing={1}>
                    <Button
                      sx={{ width: "100%" }}
                      variant="text"
                      disabled={userState?.email !== ""}
                      style={{ textTransform: "none" }}
                      onClick={() => navigate("/register")}
                    >
                      Sign Up
                    </Button>
                    <CustomButton
                      type="submit"
                      variant="contained"
                      size="large"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress /> : "Sign In"}
                    </CustomButton>
                  </Stack>
                </>
              )}
            </Formik>

            <Formik
              initialValues={{
                resetPasswordMail: "",
              }}
              validationSchema={Yup.object().shape({
                resetPasswordMail: Yup.string()
                  .required()
                  .email()
                  .label("e-mail Address")
                  .min(3)
                  .max(36),
              })}
              onSubmit={sendForgotPasswordEmail}
            >
              {({ errors, handleSubmit, handleChange, touched }) => (
                <Dialog open={open} onClose={handleDialogClose}>
                  <DialogContent>
                    <DialogContentText>
                      Please Enter your email here to reset password
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="resetPasswordMail"
                      label="E-mail"
                      type="email"
                      fullWidth
                      variant="standard"
                      error={
                        errors.resetPasswordMail && touched.resetPasswordMail
                      }
                      helperText={
                        touched.resetPasswordMail
                          ? errors.resetPasswordMail
                          : ""
                      }
                      onChange={handleChange("resetPasswordMail")}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                    <Button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={loading}
                    >
                      {loading ? <CircularProgress /> : "Continue"}
                    </Button>
                  </DialogActions>
                </Dialog>
              )}
            </Formik>
          </Stack>
          <HeightBox height={15} />
        </div>
      </Paper>
    </div>
  );
}
