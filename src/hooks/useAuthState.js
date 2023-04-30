import { useSelector } from "react-redux";
/**
 * Reads the auth state from the redux store and returns it.
 */
export default function useAuthState() {
  const state = useSelector((state) => state.auth);

  const user = state.user;
  const isLoggedIn = state.user !== null;

  return {
    user,
    isLoggedIn,
  }
}
