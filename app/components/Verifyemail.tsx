"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Mail, Key, Check, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const EmailVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'email' | 'otp' | 'success'>('email');
  const [otp, setOtp] = useState<string[]>(Array(4).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const API_URL = "https://car-rental-system-wgtb.onrender.com/graphql";

  // Validate email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    if (step === 'otp' && inputRefs.current[0]) {
      inputRefs.current[0]?.focus();
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [step]);

  // Navigate to login only after successful verification
  useEffect(() => {
    if (step === 'success') {
      router.push('/login');
    }
  }, [step, router]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      sendVerificationEmail();
    } else {
      setIsValidEmail(false);
    }
    // Removed router.push("/login") from here
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (e.target.value && !isValidEmail) {
      setIsValidEmail(validateEmail(e.target.value));
    }
  };

  const handleInputChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value.slice(0, 1);
      setOtp(newOtp);
      if (value && index < 3) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d+$/.test(pastedData)) {
      const digits = pastedData.slice(0, 4).split('');
      const newOtp = [...otp];
      digits.forEach((digit, index) => {
        if (index < 4) newOtp[index] = digit;
      });
      setOtp(newOtp);
      if (digits.length < 4) {
        inputRefs.current[digits.length]?.focus();
      }
    }
  };

  const sendVerificationEmail = async () => {
    setIsLoading(true);
    try {
      const query = `
        mutation {
          sendVerificationEmail(email: "${email}") {
            message
          }
        }
      `;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const message = result.data?.sendVerificationEmail?.message;
      console.log(`Sending verification email to ${email}: ${message}`);
      toast.success("Verification email sent successfully");
      setStep('otp');
    } catch (error: unknown) {
      console.error("Error sending verification email:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Failed to send verification email");
      } else {
        toast.error("Failed to send verification email");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async () => {
    setIsLoading(true);
    const otpCode = otp.join('');
    try {
      const query = `
        mutation {
          verifyEmail(email: "${email}", code: "${otpCode}") {
            message
          }
        }
      `;
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const message = result.data?.verifyEmail?.message;
      console.log(`Verifying OTP ${otpCode} for ${email}: ${message}`);
      toast.success("Email verified successfully");
      setStep('success'); // This triggers the useEffect to navigate to /login
    } catch (error: unknown) {
      console.error("Error verifying OTP:", error);
      if (error instanceof Error) {
        toast.error(error.message || "Invalid OTP code");
      } else {
        toast.error("Invalid OTP code");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resendOtp = () => {
    setIsLoading(true);
    setCanResend(false);
    setTimer(60);
    sendVerificationEmail();
  };

  const handleStartOver = () => {
    setEmail('');
    setOtp(Array(4).fill(''));
    setStep('email');
    setCanResend(false);
    setTimer(60);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="animate-fade-in w-full max-w-md">
        {step === 'email' && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-4 flex flex-col items-center pt-8">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-105">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Verify Your Email</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Enter your email to receive a verification code
                </CardDescription>
              </div>
            </CardHeader>
            <form onSubmit={handleEmailSubmit}>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={handleEmailChange}
                    className={`h-12 ${!isValidEmail ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"}`}
                    required
                  />
                  {!isValidEmail && (
                    <p className="text-sm text-red-500">Please enter a valid email address</p>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pb-8">
                <Button 
                  type="submit" 
                  className="w-full h-12 border-2 bg-white border-red-500 hover:bg-red-400 hover:text-white text-black font-semibold transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Continue"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === 'otp' && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-4 flex flex-col items-center pt-8">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-105">
                <Key className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Enter Verification Code</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  We sent a 4-digit code to {email}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="flex justify-center gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <Input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={otp[index] || ''}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-14 h-14 text-center text-2xl font-medium border-2 rounded-lg focus:ring-red-500 focus:border-red-500"
                    autoComplete="one-time-code"
                  />
                ))}
              </div>
              <div className="text-center space-y-2">
                <p className="text-sm text-gray-600">
                  {canResend ? (
                    <span>Didn’t get the code?</span>
                  ) : (
                    <span>Resend code in {timer} seconds</span>
                  )}
                </p>
                {canResend && (
                  <Button 
                    variant="link" 
                    onClick={resendOtp} 
                    className="text-red-500 hover:text-red-600 font-semibold"
                    disabled={isLoading}
                  >
                    Resend Verification Code
                  </Button>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-4 pb-8">
              <Button 
                onClick={verifyOtp} 
                className="w-full h-12 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-200"
                disabled={otp.join('').length !== 4 || isLoading}
              >
                {isLoading ? "Verifying..." : "Verify"}
              </Button>
              <Button 
                variant="outline" 
                onClick={handleStartOver} 
                className="w-full h-12 border-red-500 text-gray-700 hover:bg-gray-50"
                disabled={isLoading}
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Email
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 'success' && (
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
            <CardHeader className="space-y-4 flex flex-col items-center pt-8">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center transition-all hover:scale-105">
                <Check className="h-8 w-8 text-white" />
              </div>
              <div className="text-center">
                <CardTitle className="text-2xl font-bold text-gray-800">Email Verified!</CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  {email} has been successfully verified. Redirecting to login...
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        )}
      </div>
    </div>
  );
};

export default EmailVerification;