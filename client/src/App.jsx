//cleaned code
//app.jsx has the job of keeping the app running smoothly after main.jsx sets up the webapp
import { useEffect, useMemo } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";

import { themeSettings } from "./theme";
import socket from "./socket";

import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";

/* --- App --- */
function App() {

/* --- State & Global Data --- */

        // Read global Redux state
    const mode = useSelector((state) => state.mode);
    const token = useSelector((state) => state.token);
        // Theme
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    const isAuth = Boolean(token);
  

/* --- EFFECTS & DATA FETCHING --- */
        // Socket.io connection based on Auth State
    useEffect(() => {

        if (isAuth) {
            socket.auth = { token: `Bearer ${token}` };
            socket.connect();
        } 

        else {
            socket.disconnect();
        }

    }, [isAuth, token]);


/* --- Render UI --- */
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>

                {/*LoginPage access through '/'*/}
            <Route path="/" element={<LoginPage />} />

                {/*HomePage access through /home if authorized else back to LoginPage*/}
            <Route path="/home" element={isAuth ? <HomePage /> : <Navigate to="/" />} />

                {/*ProfilePage access through /profile/userid if authorized else back to LoginPage*/}
            <Route path="/profile/:userId" element={isAuth ? <ProfilePage /> : <Navigate to="/" /> }/>

          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;