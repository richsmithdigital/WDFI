import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

function useAuth(fbAuth) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const googleProvider = new fbAuth.GoogleAuthProvider();

  fbAuth().onAuthStateChanged(fbUser => {
    setLoading(false);
    if (fbUser) {
      setIsAuthenticated(true);
      setUser(fbUser);
      return;
    }

    setIsAuthenticated(false);
  });

  const createEmailUser = (email, password) =>
    fbAuth().createUserWithEmailAndPassword(email, password);

  const signInEmailUser = (email, password) =>
    fbAuth().signInWithEmailAndPassword(email, password);

  const signInWithProvider = provider => {
    debugger;
    switch (provider) {
      case "google":
        fbAuth().signInWithRedirect(googleProvider);
        break;


      default:
        throw new Error("unsupported provider");
    }
  };

  const signOut = () => fbAuth().signOut();

  return {
    isAuthenticated,
    user,
    loading,
    createEmailUser,
    signInEmailUser,
    signOut,
    signInWithProvider
  };
}
export default useAuth;
