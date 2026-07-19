'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CalendarDays, Download, Eye, GraduationCap, MapPin } from 'lucide-react';
import AttendanceRing from '@/app/components/shared/AttendanceRing';
import MilestoneTimeline, { THESIS_MILESTONES, type MilestoneStage } from '@/app/components/shared/MilestoneTimeline';

interface NextClass {
  courseCode: string;
  instructor: string;
  room: string;
  time: string;
  minutesUntil: number;
}

interface AcademicSummary {
  attendancePercentage: number;
  cgpa: number;
  cgpaScale: number;
}

interface ScheduleItem {
  time: string;
  courseCode: string;
  courseTitle: string;
  room: string;
}

interface ResourcePreviewFile {
  id: string;
  title: string;
  sizeLabel: string;
  date: string;
}

interface ThesisMilestonePreview {
  name: string;
  status: MilestoneStage;
}

interface StudentDashboardData {
  studentName: string;
  program: string;
  nextClass: NextClass;
  summary: AcademicSummary;
  weeklySchedule: Record<string, ScheduleItem[]>;
  resourcePreview: { courseCode: string; files: ResourcePreviewFile[] };
  thesisMilestones: ThesisMilestonePreview[];
}

const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];

export default function StudentDashboard() {
  const [data, setData] = useState<StudentDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeDay, setActiveDay] = useState(WEEK_DAYS[0]);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setData({
        studentName: 'Ariana',
        program: 'B.Sc. in CSE • 6th Semester',
        nextClass: { courseCode: 'CSE-204', instructor: 'Dr. Farzana Ahmed', room: 'Room 118', time: '11:00 AM', minutesUntil: 42 },
        summary: { attendancePercentage: 87, cgpa: 3.65, cgpaScale: 4 },
        weeklySchedule: {
          Sun: [
            { time: '9:00 AM', courseCode: 'CSE-101', courseTitle: 'Structured Programming', room: 'Room 204' },
            { time: '11:00 AM', courseCode: 'CSE-204', courseTitle: 'Operating Systems', room: 'Room 118' },
          ],
          Mon: [{ time: '9:00 AM', courseCode: 'MAT-202', courseTitle: 'Laplace Transforms', room: 'Room 301' }],
          Tue: [{ time: '11:00 AM', courseCode: 'CSE-310', courseTitle: 'Computer Networks', room: 'Lab 3' }],
          Wed: [{ time: '9:00 AM', courseCode: 'CSE-101', courseTitle: 'Structured Programming', room: 'Room 204' }],
          Thu: [{ time: '10:00 AM', courseCode: 'CSE-310', courseTitle: 'Computer Networks', room: 'Lab 3' }],
        },
        resourcePreview: {
          courseCode: 'CSE-101',
          files: [
            { id: '1', title: 'Lecture 04 — Memory Management', sizeLabel: '2.1 MB', date: 'Jul 2' },
            { id: '2', title: 'Lecture 03 — CPU Scheduling', sizeLabel: '1.8 MB', date: 'Jun 28' },
            { id: '3', title: 'Lab Sheet 02 — Process Sync', sizeLabel: '640 KB', date: 'Jun 25' },
          ],
        },
        thesisMilestones: [
          { name: THESIS_MILESTONES[0], status: 'completed' },
          { name: THESIS_MILESTONES[1], status: 'completed' },
          { name: THESIS_MILESTONES[2], status: 'current' },
          { name: THESIS_MILESTONES[3], status: 'upcoming' },
          { name: THESIS_MILESTONES[4], status: 'upcoming' },
        ],
      });
      setLoading(false);
    }, 800);
  }, []);

  if (loading || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const { nextClass, summary, weeklySchedule, resourcePreview, thesisMilestones } = data;
  const daySchedule = weeklySchedule[activeDay] ?? [];
  const totalClasses = Object.values(weeklySchedule).reduce((acc, items) => acc + items.length, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Welcome back, {data.studentName}</h1>
        <p className="mt-1 text-gray-600">{data.program}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Next Class</span>
            <h3 className="mt-2 text-sm font-semibold text-navy-900">
              {nextClass.courseCode} • {nextClass.instructor}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
              <MapPin className="h-3.5 w-3.5" /> {nextClass.room} • {nextClass.time}
            </p>
          </div>
          <div className="min-w-[70px] rounded-xl bg-navy-900 px-3 py-4 text-center text-[#cda252]">
            <span className="block text-xl font-bold leading-none">
              {nextClass.minutesUntil}
              <span className="text-xs">m</span>
            </span>
            <span className="mt-1 block text-[8px] uppercase tracking-wider text-slate-300">until class</span>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Overall Attendance</span>
            <h3 className="mt-1 text-2xl font-bold text-navy-900">{summary.attendancePercentage}%</h3>
            <p className="mt-1 text-[11px] text-green-600">Good standing • Required: 75%</p>
          </div>
          <AttendanceRing percentage={summary.attendancePercentage} size={72} strokeWidth={7} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Current CGPA</span>
            <h3 className="mt-1 text-2xl font-bold text-navy-900">{summary.cgpa.toFixed(2)}</h3>
            <p className="mt-1 text-[11px] text-[#cda252]">Scale: {summary.cgpaScale.toFixed(2)} • Last updated today</p>
          </div>
          <CgpaRing value={summary.cgpa} scale={summary.cgpaScale} />
        </div>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center text-lg font-semibold text-navy-900">
            <CalendarDays className="mr-2 h-5 w-5 text-navy-600" /> This Week
          </h2>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-gray-500">{totalClasses} classes</span>
        </div>

        <div className="mb-4 flex gap-2 border-b border-gray-100 pb-3">
          {WEEK_DAYS.map((day) => (
            <button
              key={day}
              type="button"
              onClick={() => setActiveDay(day)}
              className={`rounded-lg px-4 py-1.5 text-xs font-medium transition-colors ${
                activeDay === day ? 'bg-[#cda252] font-semibold text-navy-900' : 'text-gray-500 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {daySchedule.length > 0 ? (
            daySchedule.map((item) => (
              <div
                key={`${item.time}-${item.courseCode}`}
                className="flex items-center justify-between rounded-xl p-3 transition-colors hover:bg-slate-50"
              >
                <span className="w-20 shrink-0 text-xs font-semibold text-gray-400">{item.time}</span>
                <span className="flex-1 pl-4 text-xs font-medium text-navy-900">
                  {item.courseCode} • {item.courseTitle}
                </span>
                <span className="text-xs text-gray-400">{item.room}</span>
              </div>
            ))
          ) : (
            <p className="py-4 text-center text-xs text-gray-400">No classes scheduled.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-navy-900">Resource Hub</h2>
            <Link href="/student/resource-hub" className="text-xs font-medium text-navy-600 hover:underline">
              View all
            </Link>
          </div>
          <span className="mb-2 block text-[11px] font-bold tracking-wider text-[#cda252]">{resourcePreview.courseCode}</span>
          <div className="space-y-2">
            {resourcePreview.files.map((file) => (
              <div key={file.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 transition-colors hover:bg-slate-100">
                <div className="min-w-0">
                  <h4 className="truncate text-xs font-medium text-navy-900">{file.title}</h4>
                  <p className="mt-0.5 text-[10px] text-gray-400">
                    {file.sizeLabel} • {file.date}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 hover:text-gray-600" aria-label={`Preview ${file.title}`}>
                    <Eye className="h-3.5 w-3.5" />
                  </button>
                  <button className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 hover:text-gray-600" aria-label={`Download ${file.title}`}>
                    <Download className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center text-lg font-semibold text-navy-900">
              <GraduationCap className="mr-2 h-5 w-5 text-navy-600" /> Thesis Tracker
            </h2>
            <Link href="/student/thesis-tracker" className="text-xs font-medium text-navy-600 hover:underline">
              Details
            </Link>
          </div>
          <MilestoneTimeline milestones={thesisMilestones} />
        </div>
      </div>
    </div>
  );
}

function CgpaRing({ value, scale }: { value: number; scale: number }) {
  const size = 72;
  const strokeWidth = 7;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, (value / scale) * 100));
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="#e5e7eb" strokeWidth={strokeWidth} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#cda252"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-semibold text-navy-900">{value.toFixed(2)}</span>
    </div>
  );
}
