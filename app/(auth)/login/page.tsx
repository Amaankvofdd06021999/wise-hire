"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="max-w-[400px] w-full bg-white shadow-lg rounded-xl p-8 flex flex-col gap-6">
      {/* Logo */}
      <div>
        <span
          className="font-semibold text-2xl"
          style={{ color: "var(--brand-600)" }}
        >
          WiseHire
        </span>
      </div>

      {/* Heading */}
      <div className="flex flex-col gap-1">
        <h1
          className="text-2xl font-semibold"
          style={{ color: "var(--gray-900)" }}
        >
          Welcome back
        </h1>
        <p className="text-sm" style={{ color: "var(--gray-500)" }}>
          Sign in to your account
        </p>
      </div>

      {/* Form fields */}
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" style={{ color: "var(--gray-700)" }}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" style={{ color: "var(--gray-700)" }}>
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
          />
        </div>

        {/* Remember me + Forgot password */}
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

        {/* Sign in button */}
        <Button
          className="w-full"
          onClick={() => router.push("/")}
        >
          Sign in
        </Button>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--gray-200)" }} />
        <span className="text-sm" style={{ color: "var(--gray-500)" }}>
          or continue with
        </span>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--gray-200)" }} />
      </div>

      {/* SSO buttons */}
      <div className="flex flex-col gap-3">
        <Button variant="outline" className="w-full">
          Continue with Google
        </Button>
        <Button variant="outline" className="w-full">
          Continue with Microsoft
        </Button>
      </div>

      {/* Sign up link */}
      <p className="text-center text-sm" style={{ color: "var(--gray-500)" }}>
        Don&apos;t have an account?{" "}
        <a
          href="#"
          className="font-semibold"
          style={{ color: "var(--brand-600)" }}
        >
          Contact sales
        </a>
      </p>
    </div>
  );
}
