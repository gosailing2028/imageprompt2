import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@saasfly/ui";
import { buttonVariants } from "@saasfly/ui/button";
import * as Icons from "@saasfly/ui/icons";

import { UserAuthForm } from "~/components/user-auth-form";
import type { Locale } from "~/config/i18n-config";
import { getDictionary } from "~/lib/get-dictionary";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function LoginPage({
  params: { lang },
}: {
  params: {
    lang: Locale;
  };
}) {
  const dict = await getDictionary(lang);
  return (
    <div className="relative flex min-h-screen w-full">
      {/* Left side - Login Form */}
      <div className="flex w-full flex-col justify-center px-8 md:w-1/2 lg:px-16 xl:px-24">
        <div className="mx-auto w-full max-w-md">
          {/* Back Button */}
          <Link
            href={`/${lang}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "mb-8 inline-flex items-center text-muted-foreground hover:text-foreground",
            )}
          >
            <Icons.ChevronLeft className="mr-2 h-4 w-4" />
            {dict.login.back}
          </Link>

          {/* Logo and Title */}
          <div className="mb-8 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Icons.User className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">Login</h1>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight">
                {dict.login.welcome_back || "Welcome back"}
              </h2>
              <p className="text-muted-foreground">
                {dict.login.signin_title || "Enter your email to sign in to your account"}
              </p>
            </div>
          </div>

          {/* Auth Form */}
          <UserAuthForm lang={lang} dict={dict.login} className="mb-4" />

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href={`/${lang}/register`}
              className="font-medium text-primary underline underline-offset-4 hover:text-primary/90"
            >
              Sign up
            </Link>
          </p>

          {/* Terms and Privacy */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link
              href={`/${lang}/terms`}
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={`/${lang}/privacy`}
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Gradient Background */}
      <div className="hidden md:flex md:w-1/2 items-center justify-center relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600">
        {/* Overlay pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.1] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        {/* Content */}
        <div className="relative z-10 max-w-lg px-8 text-center text-white">
          <h2 className="mb-6 text-4xl font-bold leading-tight">
            Welcome to
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Your Platform
            </span>
          </h2>
          <p className="mb-8 text-lg text-white/90">
            Sign in to access your dashboard and manage your applications
          </p>
          
          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <Icons.Zap className="mb-2 h-6 w-6 text-yellow-300" />
              <p className="font-medium">Fast & Reliable</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <Icons.Shield className="mb-2 h-6 w-6 text-green-300" />
              <p className="font-medium">Secure</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <Icons.Code className="mb-2 h-6 w-6 text-blue-300" />
              <p className="font-medium">Developer Friendly</p>
            </div>
            <div className="rounded-lg bg-white/10 backdrop-blur-sm p-4">
              <Icons.Globe className="mb-2 h-6 w-6 text-pink-300" />
              <p className="font-medium">Global Scale</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}