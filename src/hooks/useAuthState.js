import { useSelector } from "react-redux";
/**
 * Reads the auth state from the redux store and returns it.
 */
export default function useAuthState() {
  const state = useSelector((state) => state.authState);

  const user = state.user;
  const isAuthenticated = true;// state.user !== null;

  return {
    user,
    isAuthenticated,
  }
}
