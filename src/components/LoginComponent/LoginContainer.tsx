import * as React from 'react';
import { LoginForm } from './LoginForm';
import type { LoginFormData } from '../../types/AuthType';
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";

export const LoginContainer: React.FC = () => {
  const navigate = useNavigate(); // hook chuyển trang

  const handleLogin = async (data: LoginFormData) => {
    try {
      console.log("Login attempt with:", data);
      const result = await login(data.username, data.password);

      console.log("Login success:", result);

      // Chuyển trang
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed. Please check username/password.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login initiated`);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleRegister = () => {
    console.log('Register clicked');
  };

  const socialProviders = [
    { imageUrl: "/images/twitter.png", provider: "TwitterTwitter" },
    { imageUrl: "/images/facebook.png", provider: "Facebook" },
    { imageUrl: "/images/instagram.png", provider: "Instagram" }
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FCE2D1] px-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg overflow-hidden bg-white">
        
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 p-8 md:p-14 flex flex-col justify-center bg-[#F1F2FE] relative">
          <img
            src="/assets/images/logo.png"
            alt="Welcome logo"
            className="w-25 mb-4 self-center"
          />
          <h2 className="text-xl font-semibold text-[#4B3B39] mb-2 text-center">
            Restaurant Chain Management System
          </h2>
          <h1 className="text-2xl font-bold text-[#4B3B39] mb-6 text-center">
            Welcome Back!
          </h1>

          <div className="w-full max-w-md mx-auto">
            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={handleForgotPassword}
            />
          </div>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:block md:w-1/2 bg-stone-700 relative">
          <img
            src="/assets/images/login-bg.png"
            alt="Login illustration"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};