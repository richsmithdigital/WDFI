import React, { useState, useEffect } from "react";
import theme from "./config/theme.js";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./config/GlobalStyles";
import Header from "./Components/Header";
import Loader from "./Components/Loader";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";

import Dash from "./Views/Dash";
import Join from "./Views/Join";
import Checkin from "./Views/Checkin";
import Profile from "./Views/Profile";
import Login from "./Views/Login";
import CalendarHome from "./Views/CalendarHome";
import Schedule from "./Views/Schedule";


import useAuth from "./services/firebase/useAuth";
import useCheckin from "./services/firebase/useCheckin";
import useChallenge from "./services/firebase/useChallenge";

import firebase from "firebase/app"; // the firbase core lib
import "firebase/auth"; // specific products
import "firebase/firestore";
import firebaseConfig from "./config/firebase"; // the firebase config we set up ealier

let initAttemptedRoute = "/";

function Protected({ authenticated, children, ...rest }) {
  initAttemptedRoute = useLocation().pathname;

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function RedirectToDash({ authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        !authenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: initAttemptedRoute,
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const {
    isAuthenticated,
    createEmailUser,
    signInEmailUser,
    signInWithProvider,
    signOut,
    user,
    loading
  } = useAuth(firebase.auth);

  const { createCheckin, readCheckins,  readCheckinComments, writeCheckinComments} = useCheckin(firebase.firestore);
  const {readChallenges} = useChallenge(firebase.firestore);

  const handleClick = e => {
    setMenuOpen(!menuOpen);
  };

  const handleOuterWrapperClick = e => {
    setMenuOpen(false);
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        {location.pathname !== "/join" && location.pathname !== "/login" && (
          <Header
            onClick={handleClick}
            signOut={signOut}
            user={user}
            open={menuOpen}
          />
        )}
        <GlobalStyles />
        <div
          onClick={handleOuterWrapperClick}
          style={{
            width: "100vw",
            horizontalScroll: "none",
            overflowX: "hidden",
            height: "100vh"
          }}
        >
          <Switch>
            <Protected authenticated={isAuthenticated} exact path="/">
              <Dash readChallenges={readChallenges} writeCheckinComments={writeCheckinComments
              }   readCheckinComments={readCheckinComments}  user={user} readCheckins={readCheckins }  />
            </Protected>
            <RedirectToDash authenticated={isAuthenticated} path="/join">
              {/**
               * I have set up these loaders to handle the social sign-in redirect
               * which redirects back to the page you initiated it from
               * as such we only want to show the page after the redirect has authenticated
               */}

              <Join
                signInWithProvider={signInWithProvider}
                createEmailUser={createEmailUser}
              />
            </RedirectToDash>
            <RedirectToDash authenticated={isAuthenticated} path="/login">
              <Login
                signInWithProvider={signInWithProvider}
                signInEmailUser={signInEmailUser}
              />
            </RedirectToDash>
            <Protected authenticated={isAuthenticated} path="/profile">
              <Profile user={user} />
            </Protected>
            <Protected authenticated={isAuthenticated} path="/checkin">
              <Checkin createCheckin={createCheckin} user={user} />
            </Protected>
            <Protected authenticated={isAuthenticated} path="/calendarhome">
              <CalendarHome createCheckin={createCheckin} user={user} />
            </Protected>
            <Protected authenticated={isAuthenticated} path="/Schedule">
              <Schedule createCheckin={createCheckin} user={user} />
            </Protected>
          </Switch>
        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;
