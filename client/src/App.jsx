//app.jsx has the job of keeping the app running smoothly after main.jsx sets up the webapp
import { useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
//import ProfilePage from "scenes/profilePage";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import socket from "./socket";
//import TestPage from "scenes/testPage"; this is a test page for testing components

function App() {
  const mode = useSelector((state) => state.mode);
  const token = useSelector((state) => state.token);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(token);
  

    useEffect(() => {
        if (isAuth) {
            socket.auth = { token: `Bearer ${token}` };
            socket.connect();
        } else {
            socket.disconnect();
        }
    }, [isAuth, token]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
                      />

            {/*<Route*/}
            {/*  path="/profile/:userId"*/}
            {/*  element={isAuth ? <ProfilePage /> : <Navigate to="/" />}*/}
            {/*/>*/}
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;