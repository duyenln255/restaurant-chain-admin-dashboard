import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/auth.css";
import { LoginContainer } from "../../components/LoginComponent/LoginContainer";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div
      className="min-h-screen max-md:min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#FCE2D1",
      }}
    >
      <LoginContainer />
    </div>
  );
};

export default Login;
