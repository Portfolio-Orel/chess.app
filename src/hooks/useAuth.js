import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import states from "../constants/states";
/**
 * Reads the auth state from the redux store and returns it.
 */
export default function useAuth() {
  const state = useSelector((state) => state.authState);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (state.state === states.authorized) {
      setIsAuthenticated(true);
      setUser(state.user);
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  }, [state]);

  return {
    user,
    isAuthenticated,
  };
}
