import api from "./axios";

export const logoutUser = async (dispatch, logout) => {
  try {
    await api.post("/auth/logout");
  } finally {
    localStorage.clear();
    sessionStorage.clear();
    dispatch(logout());
  }
};
