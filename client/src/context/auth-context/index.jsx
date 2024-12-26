// import { initialSignInFormData, initialSignUpFormData } from "@/config";
// import { loginService, registerService } from "@/services";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
//   const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
//   const [auth, setAuth] = useState({
//     authenticate: false,
//     user: null,
//   });
//   const [loading, setLoading] = useState(true);

//   async function handleRegisterUser(e) {
//     e.preventDefault();
//     const data = await registerService(signUpFormData);
//     console.log(data);
//   }


//   async function handleLoginUser(event) {
//     event.preventDefault();
//     const data = await loginService(signInFormData);
//     console.log(data, "datadatadatadatadata");

//     if (data.success) {
//       sessionStorage.setItem(
//         "accessToken",
//         JSON.stringify(data.data.accessToken)
//       );
//       setAuth({
//         authenticate: true,
//         user: data.data.user,
//       });
//     } else {
//       setAuth({
//         authenticate: false,
//         user: null,
//       });
//     }
//   }

  
//   //check auth user

//   async function checkAuthUser() {
//     try {
//       const data = await checkAuthService();
//       if (data.success) {
//         setAuth({
//           authenticate: true,
//           user: data.data.user,
//         });
//         setLoading(false);
//       } else {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     } catch (error) {
//       console.log(error);
//       if (!error?.response?.data?.success) {
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//         setLoading(false);
//       }
//     }
//   }

//   function resetCredentials() {
//     setAuth({
//       authenticate: false,
//       user: null,
//     });
//   }

//   useEffect(() => {
//     checkAuthUser();
//   }, []);

//   console.log(auth, "gf");
//   return (
//     <AuthContext.Provider
//       value={{
//         signInFormData,
//         setSignInFormData,
//         signUpFormData,
//         setSignUpFormData,
//         handleRegisterUser,
//         handleLoginUser,
//         auth
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }









// import { initialSignInFormData, initialSignUpFormData } from "@/config";
// import { loginService, registerService, checkAuthService } from "@/services";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext(null);

// export default function AuthProvider({ children }) {
//   const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
//   const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
//   const [auth, setAuth] = useState({
//     authenticate: false,
//     user: null,
//   });
//   const [loading, setLoading] = useState(true);

//   // Persist authentication state in localStorage
//   useEffect(() => {
//     const storedAuth = localStorage.getItem("auth");
//     if (storedAuth) {
//       setAuth(JSON.parse(storedAuth));
//     }
//     setLoading(false);
//   }, []);

//   // Function to handle user registration
//   async function handleRegisterUser(e) {
//     e.preventDefault();
//     const data = await registerService(signUpFormData);
//     console.log(data);
//   }

//   // Function to handle user login
//   async function handleLoginUser(event) {
//     event.preventDefault();
//     const data = await loginService(signInFormData);
//     console.log(data, "datadatadatadatadata");

//     if (data.success) {
//       const authData = {
//         authenticate: true,
//         user: data.data.user,
//       };
//       localStorage.setItem("auth", JSON.stringify(authData));
//       setAuth(authData);
//     } else {
//       setAuth({
//         authenticate: false,
//         user: null,
//       });
//     }
//   }

//   // Function to check authenticated user on page refresh
//   async function checkAuthUser() {
//     try {
//       const data = await checkAuthService();
//       if (data.success) {
//         const authData = {
//           authenticate: true,
//           user: data.data.user,
//         };
//         localStorage.setItem("auth", JSON.stringify(authData));
//         setAuth(authData);
//       } else {
//         localStorage.removeItem("auth");
//         setAuth({
//           authenticate: false,
//           user: null,
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       localStorage.removeItem("auth");
//       setAuth({
//         authenticate: false,
//         user: null,
//       });
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Reset user credentials (e.g., for logout)
//   function resetCredentials() {
//     localStorage.removeItem("auth");
//     setAuth({
//       authenticate: false,
//       user: null,
//     });
//   }

//   // Check authentication status on component mount
//   useEffect(() => {
//     checkAuthUser();
//   }, []);

//   console.log(auth, "Current Auth State");
//   return (
//     <AuthContext.Provider
//       value={{
//         signInFormData,
//         setSignInFormData,
//         signUpFormData,
//         setSignUpFormData,
//         handleRegisterUser,
//         handleLoginUser,
//         resetCredentials,
//         auth,
//         loading,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }










import { Skeleton } from "@/components/ui/skeleton";
import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { loginService, registerService, checkAuthService } from "@/services";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);
  const [auth, setAuth] = useState({
    authenticate: false,
    user: null,
  });
  const [loading, setLoading] = useState(true);

  async function handleRegisterUser(e) {
    e.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  }

  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data, "datadatadatadatadata");

    if (data.success) {
      sessionStorage.setItem("accessToken", JSON.stringify(data.data.accessToken));
      setAuth({
        authenticate: true,
        user: data.data.user,
      });
    } else {
      setAuth({
        authenticate: false,
        user: null,
      });
    }
  }

  // Check auth user
  async function checkAuthUser() {
    const token = JSON.parse(sessionStorage.getItem("accessToken"));
    if (!token) {
      setAuth({ authenticate: false, user: null });
      setLoading(false);
      return;
    }

    try {
      const data = await checkAuthService(); // You might need to adjust this to your service
      if (data.success) {
        setAuth({
          authenticate: true,
          user: data.data.user,
        });
      } else {
        setAuth({
          authenticate: false,
          user: null,
        });
      }
    } catch (error) {
      console.log(error);
      if(!error?.response?.data?.success){
        setAuth({
          authenticate: false,
          user: null,
        });

      }
      
    } finally {
      setLoading(false);
    }
  }

  function resetCredentials() {
    setAuth({
      authenticate: false,
      user: null,
    });
    sessionStorage.removeItem("accessToken");
  }

  useEffect(() => {
    checkAuthUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser,
        auth,
        resetCredentials
      }}
    >
      {
        loading ? <Skeleton /> :  children
      }
     
    </AuthContext.Provider>
  );
}