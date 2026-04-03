"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Sparkles } from "lucide-react";

const DEMO_EMAIL = "demo@wisehire.com";
const DEMO_PASSWORD = "demo1234";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchParams.get("tab") === "signup") {
      setActiveTab("signup");
    }
  }, [searchParams]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (email && password) {
        router.push("/dashboard");
      } else {
        setError("Please enter your email and password.");
        setLoading(false);
      }
    }, 600);
  }

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (!fullName || !email || !password) {
        setError("Please fill in all fields.");
        setLoading(false);
        return;
      }
      router.push("/dashboard");
    }, 600);
  }

  function handleDemoLogin() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setActiveTab("login");
    setError("");
    setLoading(true);

    setTimeout(() => {
      router.push("/dashboard");
    }, 800);
  }

  return (
    <div className="max-w-[440px] w-full flex flex-col gap-5">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
        {/* Logo */}
        <div>
          <span
            className="font-semibold text-2xl"
            style={{ color: "var(--brand-600)" }}
          >
            WiseHire
          </span>
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-lg p-1 gap-1"
          style={{ backgroundColor: "var(--gray-100)" }}
        >
          <button
            className="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200"
            style={{
              backgroundColor:
                activeTab === "login" ? "white" : "transparent",
              color:
                activeTab === "login"
                  ? "var(--gray-900)"
                  : "var(--gray-500)",
              boxShadow:
                activeTab === "login"
                  ? "0 1px 3px rgba(0,0,0,0.08)"
                  : "none",
            }}
            onClick={() => {
              setActiveTab("login");
              setError("");
            }}
          >
            Log in
          </button>
          <button
            className="flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all duration-200"
            style={{
              backgroundColor:
                activeTab === "signup" ? "white" : "transparent",
              color:
                activeTab === "signup"
                  ? "var(--gray-900)"
                  : "var(--gray-500)",
              boxShadow:
                activeTab === "signup"
                  ? "0 1px 3px rgba(0,0,0,0.08)"
                  : "none",
            }}
            onClick={() => {
              setActiveTab("signup");
              setError("");
            }}
          >
            Sign up
          </button>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-1">
          <h1
            className="text-2xl font-semibold"
            style={{ color: "var(--gray-900)" }}
          >
            {activeTab === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm" style={{ color: "var(--gray-500)" }}>
            {activeTab === "login"
              ? "Sign in to your WiseHire account"
              : "Start your 14-day free trial"}
          </p>
        </div>

        {/* Error */}
        {error && (
          <div
            className="text-sm px-3 py-2 rounded-lg"
            style={{
              backgroundColor: "var(--error-50, #FEF3F2)",
              color: "var(--error-600, #D92D20)",
              border: "1px solid var(--error-200, #FECDCA)",
            }}
          >
            {error}
          </div>
        )}

        {/* Login Form */}
        {activeTab === "login" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" style={{ color: "var(--gray-700)" }}>
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" style={{ color: "var(--gray-700)" }}>
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--gray-400)" }}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <Label
                  htmlFor="remember"
                  className="text-sm font-normal cursor-pointer"
                  style={{ color: "var(--gray-700)" }}
                >
                  Remember me
                </Label>
              </div>
              <a
                href="#"
                className="text-sm font-semibold"
                style={{ color: "var(--brand-600)" }}
              >
                Forgot password?
              </a>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        )}

        {/* Signup Form */}
        {activeTab === "signup" && (
          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="fullName" style={{ color: "var(--gray-700)" }}>
                Full name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="signupEmail"
                style={{ color: "var(--gray-700)" }}
              >
                Work email
              </Label>
              <Input
                id="signupEmail"
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="companyName"
                style={{ color: "var(--gray-700)" }}
              >
                Company name
              </Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Your company"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label
                htmlFor="signupPassword"
                style={{ color: "var(--gray-700)" }}
              >
                Password
              </Label>
              <div className="relative">
                <Input
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--gray-400)" }}
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs" style={{ color: "var(--gray-400)" }}>
                Must be at least 8 characters
              </p>
            </div>

            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>

            <p
              className="text-xs text-center"
              style={{ color: "var(--gray-400)" }}
            >
              By signing up, you agree to our{" "}
              <a
                href="#"
                className="underline"
                style={{ color: "var(--gray-500)" }}
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="underline"
                style={{ color: "var(--gray-500)" }}
              >
                Privacy Policy
              </a>
            </p>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "var(--gray-200)" }}
          />
          <span className="text-sm" style={{ color: "var(--gray-500)" }}>
            or continue with
          </span>
          <div
            className="flex-1 h-px"
            style={{ backgroundColor: "var(--gray-200)" }}
          />
        </div>

        {/* SSO Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/dashboard")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => router.push("/dashboard")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M11.4 24H0V11.4h11.4V24zM24 24H12.6V11.4H24V24zM11.4 11.4H0V0h11.4v11.4zM24 11.4H12.6V0H24v11.4z"
                fill="#00A4EF"
              />
            </svg>
            Microsoft
          </Button>
        </div>
      </div>

      {/* Demo Account Card */}
      <div
        className="rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all duration-200 hover:scale-[1.01]"
        style={{
          background:
            "linear-gradient(135deg, var(--brand-50) 0%, var(--brand-100, #EBF0FF) 100%)",
          border: "1px solid var(--brand-200, #C6D4FF)",
        }}
        onClick={handleDemoLogin}
      >
        <div
          className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
          style={{ backgroundColor: "var(--brand-600)" }}
        >
          <Sparkles size={20} color="white" />
        </div>
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--brand-700, var(--brand-600))" }}
          >
            Try the demo account
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--brand-500, var(--gray-500))" }}
          >
            {DEMO_EMAIL} / {DEMO_PASSWORD}
          </p>
        </div>
        <span
          className="text-sm font-medium shrink-0"
          style={{ color: "var(--brand-600)" }}
        >
          Launch →
        </span>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
