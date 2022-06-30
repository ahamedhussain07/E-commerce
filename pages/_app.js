import { ChakraProvider } from "@chakra-ui/react";
import "../styles/globals.css";

import axios from "axios";
import { parseCookies, destroyCookie } from "nookies";

import baseUrl from "../utils/baseUrl";
import { redirectUser } from "../utils/authUser";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

// MyApp.getInitialProps = async ({ ctx, Component }) => {
//   const { token } = parseCookies(ctx);

//   let pageProps = {};

//   const protectedRoutes = ctx.pathname === "/";

//   if (Component.getInitialProps) {
//     pageProps = await Component.getInitialProps(ctx);
//   }

//   if (!token) {
//     destroyCookie(ctx, "token");
//     protectedRoutes && redirectUser(ctx, "/Authication");
//   } else {
//     try {
//       const res = await axios.get(`${baseUrl}/api/auth`, {
//         headers: { Authorization: token },
//       });

//       const {user} = res.data

//       if(user)  !protectedRoutes && redirectUser(ctx,'/')

//       pageProps.user = user

//     } catch (error) {
//       destroyCookie(ctx, "token");
//       redirectUser(ctx, "/Authication");
//     }
//   }

//   return {pageProps}

// };

export default MyApp;
