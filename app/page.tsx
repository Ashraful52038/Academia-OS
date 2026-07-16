"use client";

import { useState } from "react";
import { Eye, EyeOff, GraduationCap, Landmark, Users, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { DEMO_CREDENTIALS, login, type UserRole } from "@/services/authService";

export default function Home() {
  const router = useRouter();
  // ১. ইউজার স্টেট এবং রোল ট্র্যাকিং (ইনপুটগুলো একদম খালি থাকবে)
  const [selectedRole, setSelectedRole] = useState<"teacher" | "student" | "dept-head">("teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // ব্যাকএন্ড রিকোয়েস্টের লোডিং স্টেট
  const [error, setError] = useState("");

  // ২. রোল পরিবর্তনের সাথে সাথে ইনপুট রিসেট করা (সিকিউরিটি ও ইউজার এক্সপেরিয়েন্সের জন্য ভালো প্র্যাকটিস)
  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError("");
  };

  // ৩. ব্যাকএন্ড এপিআই সাবমিট হ্যান্ডলার (অ্যাসিঙ্ক্রোনাস ফাংশন)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // ব্যাকএন্ডে পাঠানোর জন্য পেলোড (Payload)
    const loginCredentials = {
      role: selectedRole,
      email: email,
      password: password,
    };

    try {
      await login(loginCredentials);
      router.push(`/${selectedRole}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsLoading(false); // লোডিং শেষ
    }
  };

  return (
    <div className="min-h-screen bg-[#07162c] flex flex-col items-center justify-center text-white px-4 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ড লাইনিং ইফেক্ট */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none"></div>

      {/* লোগো এবং হেডার সেকশন */}
      <div className="flex flex-col items-center mb-6 sm:mb-8 z-10 text-center">
        <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#cda252] rounded-full flex items-center justify-center shadow-lg mb-3 sm:mb-4">
          <Landmark className="w-6 h-6 sm:w-7 sm:h-7 text-[#07162c]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-wide text-white font-serif">
          AcademiaOS
        </h1>
        <p className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 mt-1">
          University Department Management
        </p>
      </div>

      {/* সাইন-ইন কার্ড */}
      <div className="bg-white text-gray-800 rounded-2xl p-5 sm:p-8 w-full max-w-[400px] sm:max-w-[440px] shadow-2xl z-10 mx-auto">
        <p className="text-xs sm:text-sm font-medium text-gray-500 mb-3 sm:mb-4">Sign in as</p>

        {/* রোল সিলেক্টর বাটনসমূহ */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
          {/* Teacher Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleRoleChange("teacher")}
            className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl border transition-all cursor-pointer ${
              selectedRole === "teacher"
                ? "border-[#cda252] bg-[#fdfaf2] text-[#8a6d3b] font-semibold"
                : "border-gray-200 hover:bg-gray-50 text-gray-500"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
            <span className="text-[11px] sm:text-xs">Teacher</span>
          </button>

          {/* Student Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleRoleChange("student")}
            className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl border transition-all cursor-pointer ${
              selectedRole === "student"
                ? "border-[#cda252] bg-[#fdfaf2] text-[#8a6d3b] font-semibold"
                : "border-gray-200 hover:bg-gray-50 text-gray-500"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
            <span className="text-[11px] sm:text-xs">Student</span>
          </button>

          {/* Dept. Head Button */}
          <button
            type="button"
            disabled={isLoading}
            onClick={() => handleRoleChange("dept-head")}
            className={`flex flex-col items-center justify-center py-2.5 sm:py-3 px-1 sm:px-2 rounded-xl border transition-all cursor-pointer ${
              selectedRole === "dept-head"
                ? "border-[#cda252] bg-[#fdfaf2] text-[#8a6d3b] font-semibold"
                : "border-gray-200 hover:bg-gray-50 text-gray-500"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Landmark className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
            <span className="text-[11px] sm:text-xs">Dept. Head</span>
          </button>
        </div>

        {/* ইনপুট ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          {/* ইমেইল ইনপুট (ডায়নামিক প্লেসহোল্ডারসহ) */}
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#f4f6f8] text-gray-700 pl-11 pr-4 py-2.5 sm:py-3 rounded-xl border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-all text-xs sm:text-sm disabled:opacity-50"
              placeholder={
                selectedRole === "teacher" 
                  ? "Enter teacher email..." 
                  : selectedRole === "student" 
                    ? "Enter student email..." 
                    : "Enter department head email..."
              }
              required
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}

          {/* পাসওয়ার্ড ইনপুট */}
          <div className="relative flex items-center">
            <span className="absolute left-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#f4f6f8] text-gray-700 pl-11 pr-11 py-2.5 sm:py-3 rounded-xl border border-transparent focus:border-gray-300 focus:bg-white focus:outline-none transition-all text-xs sm:text-sm disabled:opacity-50"
              placeholder="Enter your password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              disabled={isLoading}
              aria-label={showPassword ? "Hide password" : "Show password"}
              aria-pressed={showPassword}
              className="absolute right-4 text-gray-400 transition-colors hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>
          </div>

          {/* সাবমিট বাটন (লোডিং অ্যানিমেশনসহ) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#0d1e36] text-white py-3 sm:py-3.5 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-[#142a4a] transition-colors cursor-pointer text-xs sm:text-sm mt-2 shadow-md disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Enter
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 sm:mt-5 rounded-lg bg-[#f4f6f8] px-3 py-2 text-center text-[10px] sm:text-xs text-gray-500">
          <p className="font-semibold text-gray-600">Demo login</p>
          <p>{DEMO_CREDENTIALS.email}</p>
          <p>{DEMO_CREDENTIALS.password}</p>
        </div>
      </div>
    </div>
  );
}
