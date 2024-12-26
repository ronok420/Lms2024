import { useContext, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/auth/Index";
import RouteGuard from "./components/route-guard";
import { AuthContext } from "./context/auth-context";
import InstructorDashboardpage from "./pages/instructor";
import StudentHomePage from "./pages/student/home";
import StudentViewCommonLayout from "./components/student-view/common-layout";

function App() {
  const { auth } = useContext(AuthContext);

  return (
    // <>
    //   <Routes>
    //     <Route path='/' element={<AuthPage/>}></Route>
    //   </Routes>

    // </>
    <Routes>
      {/* <Route path="/" element={<Navigate to="/auth/home" replace />} /> */}
      <Route
        path="/auth"
        element={
          <RouteGuard
            element={<AuthPage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
      <Route
        path="/instructor"
        element={ <RouteGuard  element={<InstructorDashboardpage />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      />
       <Route
        path="/"  element={ <RouteGuard element={<StudentViewCommonLayout />}
            authenticated={auth?.authenticate}
            user={auth?.user}
          />
        }
      >
        <Route path="" element={<StudentHomePage />} />
        <Route path="home" element={<StudentHomePage />} />
        
        
        
      
      </Route>
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  //   <Routes>
  //   <Route
  //     path="/auth"
  //     element={<RouteGuard element={<AuthPage />} />}
  //   />
  //   <Route
  //     path="/instructor"
  //     element={<RouteGuard element={<InstructorDashboardpage />} />}
  //   />
  //   <Route
  //     path="/"
  //     element={<RouteGuard element={<StudentViewCommonLayout />} />}
  //   >
  //     <Route path="" element={<StudentHomePage />} />
  //     <Route path="home" element={<StudentHomePage />} />
  //   </Route>
  //   <Route path="*" element={<Navigate to="/auth" />} />
  // </Routes>
  );
}

export default App;
