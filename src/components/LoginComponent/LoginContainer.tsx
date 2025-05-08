import * as React from 'react';
import { LoginForm } from './LoginForm';
import { SocialAuth } from './SocialAuth';
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
    console.log('Forgot password clicked');
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
<div className="flex bg-indigo-50 max-md:flex-col w-4xl">
  {/* Left column - Login */}
  <div className="flex flex-col justify-center items-center w-1/2 max-md:w-full py-16 px-8">
    <img
      src="/assets/images/logo.png"
      alt="Welcome logo"
      className="w-[100px] mb-2"
    />
    <h2 className="text-lg font-bold text-zinc-800 mb-6 text-center">
      Restaurant Chain Management System
    </h2>
    <h1 className="text-2xl font-bold mb-6 text-zinc-900 text-center">
      Welcome Back!
    </h1>

    <div className="w-full max-w-md space-y-8">
      <LoginForm
        onSubmit={handleLogin}
        onForgotPassword={handleForgotPassword}
      />

      {/* <p className="text-center text-sm text-gray-500">
        Forgot your password?{" "}
        <button
          onClick={handleForgotPassword}
          className="text-indigo-600 hover:underline"
        >
          Reset here
        </button>
      </p> */}
    </div>
  </div>

  {/* Right column - Image */}
  <div className="flex justify-center items-center w-1/2 max-md:w-full bg-stone-700 py-16 px-8">
    <img
      src="/assets/images/login-bg.png"
      alt="Login illustration"
      className="object-contain max-h-[400px] w-auto"
    />
  </div>
</div>

  );
};