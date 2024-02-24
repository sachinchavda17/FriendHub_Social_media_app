import React, { useState } from "react";
import axios from "axios";
import Dropzone from "react-dropzone";
import { Formik } from "formik";
import * as yup from "yup";
import { backendUrl } from "../../config";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const validationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
  location: yup.string().required("Location is required"),
  occupation: yup.string().required("Occupation is required"),
});

const FormComponent = () => {
  const [picturePath, setPicturePath] = useState("");
  const [imgName, setImgName] = useState("");
  const theme = useTheme();
  const isNonMobile = useMediaQuery(theme.breakpoints.up("sm"));
  const [pageType, setPageType] = useState("register");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const formData = new FormData();
      formData.append("file", picturePath);
      formData.append("upload_preset", "social_media");
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dbm00gxt1/image/upload",
        formData
      );
      console.log("Image uploaded:", response.data.secure_url);
      const registerResponse = await axios.post(`${backendUrl}/auth/register`, {
        ...values,
        picturePath: response.data.secure_url,
      });
      console.log("Form submitted successfully:", registerResponse);
      // Reset form data
      resetForm();
      setPicturePath("");
      setImgName("");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleLogin = async (values, { resetForm }) => {
    try {
      const loggedInResponse = await fetch(`${backendUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const loggedIn = await loggedInResponse.json();
      resetForm();
      // if (loggedIn) {
      //   dispatch(
      //     setLogin({
      //       user: loggedIn.user,
      //       token: loggedIn.token,
      //     })
      //   );
      // navigate("/");
      // }
      // Handle login logic
      console.log("Logging in with:", loggedIn);
      // Reset form data
      resetForm();
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) await handleLogin(values, onSubmitProps);
    if (isRegister) await handleSubmit(values, onSubmitProps);
  };

  const handleDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setPicturePath(file);
    setImgName(file.name);
  };

  return (
    <div>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          location: "",
          occupation: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              {isRegister && (
                <>
                  <TextField
                    label="First Name"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Location"
                    name="location"
                    value={values.location}
                    onChange={handleChange}
                    error={touched.location && Boolean(errors.location)}
                    helperText={touched.location && errors.location}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <TextField
                    label="Occupation"
                    name="occupation"
                    value={values.occupation}
                    onChange={handleChange}
                    error={touched.occupation && Boolean(errors.occupation)}
                    helperText={touched.occupation && errors.occupation}
                    sx={{ gridColumn: "span 2" }}
                  />
                  <Box
                    gridColumn="span 4"
                    border={`1px solid ${theme.palette.primary.main}`}
                    borderRadius="5px"
                    p="1rem"
                  >
                    <Dropzone
                      onDrop={handleDrop}
                      accept="image/*"
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Box
                          {...getRootProps()}
                          border={`2px dashed ${theme.palette.primary.main}`}
                          p="1rem"
                          sx={{ "&:hover": { cursor: "pointer" } }}
                        >
                          <input {...getInputProps()} />
                          {!imgName ? (
                            <Typography>Add Picture Here</Typography>
                          ) : (
                            <Box display="flex" alignItems="center">
                              <Typography>{imgName}</Typography>
                              <EditOutlinedIcon />
                            </Box>
                          )}
                        </Box>
                      )}
                    </Dropzone>
                  </Box>
                </>
              )}
              {isLogin && (
                <>
                  <TextField
                    label="Email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                    sx={{ gridColumn: "span 4" }}
                  />
                </>
              )}
            </Box>
            <Button
              type="submit"
              fullWidth
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: theme.palette.primary.main,
                color: theme.palette.background.alt,
                "&:hover": { color: theme.palette.primary.main },
              }}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
            <Button
              onClick={() => setPageType(isRegister ? "login" : "register")}
              fullWidth
              sx={{
                p: "1rem",
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              {isRegister
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default FormComponent;
