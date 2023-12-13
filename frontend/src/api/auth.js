import axios from "./axios";

const logIn = async (email, password) => {
  let response;
  let errorMessage;
  let isPending = true;
  try {
    response = await axios.post("/auth/authenticate", {
      email,
      password,
    });
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
    errorMessage = "Invalid email or password";
  }
  isPending = false;

  return { errorMessage, isPending };
};

export const signUp = async (user) => {
  let response;
  let errorMessage;
  let isPending = true;
  try {
    response = await axios.post("/auth/register", user);
    localStorage.setItem("token", response.data.token);
    return response.data;
  } catch (error) {
    console.log(error);
    errorMessage = error.message;
  }
  isPending = false;

  return { response, errorMessage, isPending };
};

export default logIn;
