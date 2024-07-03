import { jwtDecode } from "jwt-decode";
import store from "./redux/store";

export const checkAuth = () => {
  const token = localStorage.getItem("token");

  // No token
  if (!token) {
    return false;
  }

  try {
    // Check if expired
    // { exp: 1608797099 }
    const { exp } = jwtDecode(token);
    if (exp < new Date().getTime() / 1000) {
      localStorage.clear();
      return false;
    }
  } catch (e) {
    return false;
  }

  // Have token & Not expired
  return true;
};

export const checkAdmin = () => {
  const isLoggedIn = checkAuth();
  const isAdmin = store.getState().isAdmin;
  return isLoggedIn && isAdmin;
};

store.subscribe(checkAdmin);
