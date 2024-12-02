import axios from "axios";
import ErrorHandler from "../ui/ErrorHandler";
import { UserProfileToken } from "../interfaces";

const apiURL = "https://shopping-list-f1b6.onrender.com/api/v1/shopping-list";

export const login = async function (email: string, password: string) {
  try {
    const response = await axios.post<UserProfileToken>(
      `${apiURL}/users/login`,
      {
        email,
        password,
      }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const signup = async function (
  name: string,
  email: string,
  password: string,
  confirm_password: string
) {
  console.log(name, email, password, confirm_password);

  try {
    const response = await axios.post<UserProfileToken>(
      `${apiURL}/users/signup`,
      { name, email, password, confirm_password }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    // ErrorHandler(err);
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      // Handle other errors
      console.log(err);
    }
  }
};

export const logout = async function () {
  try {
    const response = await axios.post(`${apiURL}/users/logout`);
    // console.log(response.data);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
