import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/Home";
import LoginPage from "./scenes/loginPage/Login";
import ProfilePage from "./scenes/profilePage/Profile";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { themeSettings } from "./theme";

function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
