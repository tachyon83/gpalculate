import decode from "jwt-decode";

export const checkAuth = () => {
  const token = localStorage.getItem("token");

  // No token
  if (!token) {
    return false;
  }

  try {
    // Check if expired
    // { exp: 1608797099 }
    const { exp } = decode(token);
    if (exp < new Date().getTime() / 1000) {
      return false;
    }
  } catch (e) {
    return false;
  }

  // Have token & Not expired
  return true;
};
