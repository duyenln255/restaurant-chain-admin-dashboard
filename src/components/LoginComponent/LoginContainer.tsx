import * as React from 'react';
import { LoginForm } from './LoginForm';
import { SocialAuth } from './SocialAuth';
import { LoginFormData } from '../../types/AuthType';

export const LoginContainer: React.FC = () => {
  const handleLogin = async (data: LoginFormData) => {
    try {
      console.log('Login attempt with:', data);
    } catch (error) {
      console.error('Login failed:', error);
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
    <div className="overflow-hidden pl-20 bg-indigo-50 max-md:pl-5">
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col w-1/2 max-md:ml-0 max-md:w-full">
          <div className="flex flex-col items-center self-stretch my-auto w-full max-md:mt-10">
            <img
              src="/assets/images/logo.png"
              alt="Welcome logo"
              className="object-contain max-w-full aspect-[1.03] w-[120px]"
            />
            <h1 className="self-stretch mt-4 text-base font-bold text-center text-zinc-900">
              Welcome Back!
            </h1>

            <LoginForm
              onSubmit={handleLogin}
              onForgotPassword={handleForgotPassword}
              onRegister={handleRegister}
            />

            <div className="flex gap-2.5 items-center mt-4">
              {socialProviders.map((provider) => (
                <SocialAuth
                  key={provider.provider}
                  imageUrl={provider.imageUrl}
                  provider={provider.provider}
                  onClick={() => handleSocialLogin(provider.provider)}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-5 w-1/22 max-md:ml-0 max-md:w-full">
          <div className="flex grow gap-2.5 justify-center items-center px-14 py-28 w-full bg-stone-700 min-h-[720px] max-md:px-5 max-md:py-24 max-md:mt-10">
            <img
              src="/assets/images/login-bg.png"
              alt="Login illustration"
              className="object-contain self-stretch my-auto aspect-square min-w-[240px] w-[500px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};