import { initialSignInFormData, initialSignUpFormData } from "@/config";
import { loginService, registerService } from "@/services";
import { createContext, useState } from "react";

export const AuthContext = createContext(null);
export default function AuthProvider({ children }) {
  const [signInFormData, setSignInFormData] = useState(initialSignInFormData);
  const [signUpFormData, setSignUpFormData] = useState(initialSignUpFormData);

  async function handleRegisterUser(e) {
    e.preventDefault();
    const data = await registerService(signUpFormData);
    console.log(data);
  }


  async function handleLoginUser(event) {
    event.preventDefault();
    const data = await loginService(signInFormData);
    console.log(data, "datadatadatadatadata");

    // if (data.success) {
    //   sessionStorage.setItem(
    //     "accessToken",
    //     JSON.stringify(data.data.accessToken)
    //   );
    //   setAuth({
    //     authenticate: true,
    //     user: data.data.user,
    //   });
    // } else {
    //   setAuth({
    //     authenticate: false,
    //     user: null,
    //   });
    // }
  }
  return (
    <AuthContext.Provider
      value={{
        signInFormData,
        setSignInFormData,
        signUpFormData,
        setSignUpFormData,
        handleRegisterUser,
        handleLoginUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
