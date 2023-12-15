import axios from "./axios";
export const USER = JSON.parse(localStorage.getItem("user"));
export const ROLES = {
  user: "USER",
  admin: "ADMIN",
};

const logIn = async (email, password) => {
  let response;
  let errorMessage;
  try {
    response = await axios.post("/auth/authenticate", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    response = response.data.user;
  } catch (error) {
    console.log(error);
    errorMessage = "Invalid email or password";
  }

  return { response, errorMessage };
};

export const signUp = async (user) => {
  let response;
  let errorMessage;
  try {
    response = await axios.post("/auth/register", user);
    return response.data;
  } catch (error) {
    console.log(error);
    errorMessage = error.response.data;
  }

  return { response, errorMessage };
};

export const logOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export default logIn;
