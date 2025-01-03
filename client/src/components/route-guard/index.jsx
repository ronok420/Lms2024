

import { AuthContext } from "@/context/auth-context";
import { Fragment, useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

function RouteGuard({ authenticated, user, element }) {
  const location = useLocation();
  const { loading } = useContext(AuthContext);

  console.log(authenticated, user, "useruser");
  // Allow public access to the /success route
 

  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" />;
  }

  if (
    authenticated &&
    user?.role !== "instructor" &&
    (location.pathname.includes("instructor") ||
      location.pathname.includes("/auth"))
  ) {
    return <Navigate to="/home" />;
  }

  if (
    authenticated &&
    user.role === "instructor" &&
    !location.pathname.includes("instructor")
  ) {
    return <Navigate to="/instructor" />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;



// import { AuthContext } from "@/context/auth-context";
// import { Fragment, useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";

// function RouteGuard({ authenticated, user,element }) {
//   const location = useLocation();
//   const { auth, loading } = useContext(AuthContext);

// //   const { authenticated, user } = auth;

//   console.log(authenticated, user, "useruser");

//   // Show a loading spinner or message until authentication state is resolved
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   // Redirect unauthenticated users trying to access non-auth routes
//   if (!authenticated && !location.pathname.includes("/auth")) {
//     return <Navigate to="/auth" />;
//   }

//   // Redirect authenticated users with non-instructor roles accessing instructor routes
//   if (
//     authenticated &&
//     user?.role !== "instructor" &&
//     location.pathname.includes("instructor")
//   ) {
//     return <Navigate to="/home" />;
//   }

//   // Redirect authenticated instructors trying to access non-instructor routes
//   if (
//     authenticated &&
//     user?.role === "instructor" &&
//     !location.pathname.includes("instructor")
//   ) {
//     return <Navigate to="/instructor" />;
//   }

//   // Prevent authenticated users from accessing auth routes
//   if (authenticated && location.pathname.includes("/auth")) {
//     return <Navigate to="/home" />;
//   }

//   // Render the desired component if all checks pass
//   return <Fragment>{element}</Fragment>;
// }

// export default RouteGuard;

