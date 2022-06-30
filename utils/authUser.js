import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";

import Router from "next/router";
import cookie from "js-cookie";

export const registerUser = async (
  data,
  profilePicUrl,
  setErrorMsg,
  setFormLoading
) => {
  try {
    const res = await axios.post(`${baseUrl}/api/signup`, {
      data,
      profilePicUrl,
    });

    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setErrorMsg(errorMsg);
  }
  setFormLoading(false);
};

export const loginUser = async (data, setError, setLoading) => {
  try {
    const res = await axios.post(`${baseUrl}/api/login`, { data });

    setToken(res.data)
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
  setLoading(false)
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/");
};

export const redirectUser = (ctx, location) => {
  if (ctx.req) {
    // it means http req on server side
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    // if user on client side
    Router.push(location);
  }
};


export const logoutUser = (username) =>{
  cookie.set("username",email)
    cookie.remove("token")
    Router.push("/login")
    Router.reload()
}