"use client";

import React from "react";
import { Download, Eye, CheckCircle2, Clock } from "lucide-react";

export default function StudentDashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* ১. স্বাগতম হেডার */}
      <div>
        <h1 className="text-2xl font-bold text-[#07162c]">Welcome back, Ariana</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">B.Sc. in CSE • 6th Semester</p>
      </div>

      {/* ২. ইনফো কার্ড সেকশন (Next Class, Attendance, CGPA) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Next Class কার্ড */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div className="space-y-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Next Class</span>
            <div>
              <h3 className="font-semibold text-slate-800 text-sm">CSE-204 • Dr. Farzana Ahmed</h3>
              <p className="text-xs text-slate-500 mt-1">Room 118 • 11:00 AM</p>
            </div>
          </div>
          {/* টাইম কাউন্টডাউন */}
          <div className="bg-[#07162c] text-[#cda252] py-4 px-3 rounded-xl text-center min-w-[70px]">
            <span className="block text-xl font-bold leading-none">42<span className="text-xs">m</span></span>
            <span className="text-[8px] uppercase tracking-wider text-slate-300 mt-1 block">until class</span>
          </div>
        </div>

        {/* Attendance কার্ড */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Overall Attendance</span>
            <h3 className="text-2xl font-bold text-slate-800">87%</h3>
            <p className="text-[10px] text-green-500">Good standing • Required: 75%</p>
          </div>
          {/* প্রগ্রেস রিং */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
              <circle cx="32" cy="32" r="26" stroke="#10b981" strokeWidth="6" fill="transparent" strokeDasharray={163.3} strokeDashoffset={163.3 - (163.3 * 87) / 100} />
            </svg>
            <span className="absolute text-xs font-semibold text-slate-700">87%</span>
          </div>
        </div>

        {/* CGPA কার্ড */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-center">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current CGPA</span>
            <h3 className="text-2xl font-bold text-slate-800">3.65</h3>
            <p className="text-[10px] text-[#cda252]">Scale: 4.00 • Last Updated Today</p>
          </div>
          {/* প্রগ্রেস রিং */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="32" cy="32" r="26" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
              <circle cx="32" cy="32" r="26" stroke="#cda252" strokeWidth="6" fill="transparent" strokeDasharray={163.3} strokeDashoffset={163.3 - (163.3 * 91) / 100} />
            </svg>
            <span className="absolute text-xs font-semibold text-slate-700">3.65</span>
          </div>
        </div>
      </div>

      {/* ৩. This Week সেকশন */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-slate-800 text-sm">This Week</h2>
          <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">8 classes</span>
        </div>

        <div className="flex gap-2 border-b border-slate-100 pb-3">
          {["Sun", "Mon", "Tue", "Wed", "Thu"].map((day, idx) => (
            <button
              key={day}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                idx === 0 
                  ? "bg-[#cda252] text-[#07162c] font-semibold" 
                  : "text-slate-500 hover:bg-slate-50"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
            <span className="text-xs font-semibold text-slate-400 w-16">9:00 AM</span>
            <span className="text-xs font-medium text-slate-800 flex-1 pl-4">CSE-101 • Structured Programming</span>
            <span className="text-xs text-slate-400">Room 204</span>
          </div>
          <div className="flex justify-between items-center p-3 hover:bg-slate-50 rounded-xl transition-colors">
            <span className="text-xs font-semibold text-slate-400 w-16">11:00 AM</span>
            <span className="text-xs font-medium text-[#07162c] font-semibold flex-1 pl-4">CSE-204 • Operating Systems</span>
            <span className="text-xs text-slate-400">Room 118</span>
          </div>
        </div>
      </div>

      {/* ৪. Resource Hub এবং Thesis Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Resource Hub */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-slate-800 text-sm">Resource Hub</h2>
            <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">3 courses updated</span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-[#cda252] tracking-wider block mb-2">CSE-101</span>
              <div className="space-y-2">
                {[
                  { name: "Lecture 04 — Memory Management", size: "2.1 MB • Jul 2" },
                  { name: "Lecture 03 — CPU Scheduling", size: "1.8 MB • Jun 28" },
                  { name: "Lab Sheet 02 — Process Sync", size: "640 KB • Jun 25" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-[#f8fafc] hover:bg-slate-100 rounded-xl transition-all">
                    <div>
                      <h4 className="text-xs font-medium text-slate-800">{item.name}</h4>
                      <p className="text-[9px] text-slate-400 mt-0.5">{item.size}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 border border-slate-100">
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button className="p-1.5 bg-white hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 border border-slate-100">
                        <Download className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thesis Tracker */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h2 className="font-semibold text-slate-800 text-sm">Thesis Tracker</h2>
            <p className="text-[10px] text-slate-400 mt-0.5">Federated Learning for Edge Devices</p>
          </div>

          <div className="relative border-l border-slate-100 pl-4 ml-2 space-y-6">
            <div className="relative">
              <span className="absolute -left-[25px] top-0.5 bg-white rounded-full text-green-500">
                <CheckCircle2 className="w-4 h-4 fill-green-50" />
              </span>
              <div>
                <h4 className="text-xs font-semibold text-slate-700">Proposal</h4>
                <p className="text-[9px] text-green-500 font-medium">Completed</p>
              </div>
            </div>

            <div className="relative">
              <span className="absolute -left-[25px] top-0.5 bg-white rounded-full text-green-500">
                <CheckCircle2 className="w-4 h-4 fill-green-50" />
              </span>
              <div>
                <h4 className="text-xs font-semibold text-slate-700">Literature Review</h4>
                <p className="text-[9px] text-green-500 font-medium">Reviewed • add more recent FL papers</p>
              </div>
            </div>

            <div className="relative">
              <span className="absolute -left-[25px] top-0.5 bg-white rounded-full text-amber-500">
                <Clock className="w-4 h-4 fill-amber-50" />
              </span>
              <div>
                <h4 className="text-xs font-semibold text-slate-700">Methodology</h4>
                <span className="text-[8px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 px-1.5 py-0.5 rounded mt-1 inline-block">
                  In progress
                </span>
              </div>
            </div>

            <div className="relative">
              <span className="absolute -left-[25px] top-0.5 w-4 h-4 rounded-full border-2 border-slate-200 bg-white"></span>
              <div>
                <h4 className="text-xs font-semibold text-slate-400">Implementation</h4>
                <p className="text-[9px] text-slate-300">Pending</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}