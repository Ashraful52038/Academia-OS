"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, CalendarCheck, GraduationCap, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const teacherLinks = [
  { href: "/teacher", label: "Overview", icon: BarChart3 },
  { href: "/teacher/attendance", label: "Attendance", icon: CalendarCheck },
  { href: "/teacher/thesis-sync", label: "Thesis Sync", icon: GraduationCap },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navigation = (
    <>
      <div className="border-b border-white/10 px-6 py-6">
        <Link href="/teacher" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#cda252] text-[#07162c]">
            <GraduationCap className="h-5 w-5" />
          </span>
          <div>
            <p className="font-serif text-xl font-semibold">AcademiaOS</p>
            <p className="text-xs text-slate-400">Teacher Portal</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4" aria-label="Teacher navigation">
        {teacherLinks.map(({ href, label, icon: Icon }) => {
          const active = href === "/teacher" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                active ? "bg-[#cda252] font-semibold text-[#07162c]" : "text-slate-300 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>

      <Link href="/" className="m-4 flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-300 hover:bg-white/10 hover:text-white">
        <LogOut className="h-5 w-5" />
        Sign out
      </Link>
    </>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-40 flex h-16 items-center justify-between bg-[#07162c] px-4 text-white lg:hidden">
        <span className="font-serif text-lg font-semibold">AcademiaOS</span>
        <button type="button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
          {open ? <X /> : <Menu />}
        </button>
      </header>
      {open && <button className="fixed inset-0 z-40 bg-black/40 lg:hidden" aria-label="Close menu" onClick={() => setOpen(false)} />}
      <aside className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[#07162c] text-white transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {navigation}
      </aside>
    </>
  );
}
