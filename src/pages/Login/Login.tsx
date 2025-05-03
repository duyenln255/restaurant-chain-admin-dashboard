import React from "react";

import '../../styles/auth.css';
import { LoginContainer } from "../../components/LoginComponent/LoginContainer";


const Login = () => {
    return (
    <div className="min-h-screen max-md:min-h-screen flex items-center justify-center"
    style={{
      backgroundColor: '#FCE2D1'
    }}
    >
      <LoginContainer />
    </div>
  );
}

export default Login;
