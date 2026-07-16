"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  BookOpen, 
  HelpCircle, 
  FileText, 
  Search, 
  Bell 
} from "lucide-react";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // সাইডবার মেনু আইটেমসমূহ
  const menuItems = [
    { name: "Dashboard", href: "/student", icon: LayoutDashboard },
    { name: "Resource Hub", href: "/student/resource-hub", icon: BookOpen },
    { name: "Question Bank", href: "/student/question-bank", icon: HelpCircle },
    { name: "Thesis Tracker", href: "/student/thesis-tracker", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen bg-[#f4f6f9]">
      {/* বাম পাশের সাইডবার (Sidebar) */}
      <aside className="w-64 bg-[#07162c] text-slate-300 flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          {/* লোগো সেকশন */}
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-[#cda252] rounded-full flex items-center justify-center text-[#07162c] font-bold text-sm">
              A
            </div>
            <div>
              <h2 className="text-white font-semibold leading-tight text-sm">AcademiaOS</h2>
              <p className="text-[10px] text-slate-400">DEPT. OF COMPUTER SCIENCE</p>
            </div>
          </div>

          {/* নেভিগেশন লিংকসমূহ */}
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-medium transition-colors ${
                    isActive 
                      ? "bg-white/10 text-white font-semibold" 
                      : "hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        
        <div className="p-6 border-t border-white/10 text-xs text-slate-500 text-center">
          v1.0.0
        </div>
      </aside>

      {/* ডান পাশের মেইন সেকশন */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* ওপরের টপবার (Top Navbar) */}
        <header className="h-16 bg-[#07162c] border-b border-white/10 flex items-center justify-between px-6 z-10 text-white">
          {/* সার্চ বার */}
          <div className="relative w-full max-w-xs md:max-w-md">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search courses, students, faculty..."
              className="w-full bg-white/10 border border-transparent focus:border-white/20 focus:bg-white/15 focus:outline-none rounded-lg py-1.5 pl-10 pr-4 text-xs placeholder-slate-400 text-white transition-all"
            />
          </div>

          {/* ডান পাশের অ্যাকশন বাটনসমূহ */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center bg-white/5 p-1 rounded-lg text-xs border border-white/10">
              <span className="px-3 py-1 rounded text-slate-400">Teacher</span>
              <span className="px-3 py-1 bg-[#cda252] text-[#07162c] font-semibold rounded">Student</span>
              <span className="px-3 py-1 rounded text-slate-400">Dept. Head</span>
            </div>

            {/* নোটিফিকেশন আইকন */}
            <button className="relative p-1.5 hover:bg-white/10 rounded-full text-slate-300">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* প্রোফাইল বাটন */}
            <div className="flex items-center gap-2 border-l border-white/10 pl-4">
              <div className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-xs font-semibold cursor-pointer">
                AR
              </div>
            </div>
          </div>
        </header>

        {/* মেইন কনটেন্ট এরিয়া */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}