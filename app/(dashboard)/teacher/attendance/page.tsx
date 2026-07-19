'use client';

import { useEffect, useState } from 'react';
import { CalendarCheck, Users, AlertTriangle, BarChart3 } from 'lucide-react';
import { ATTENDANCE_WARNING_THRESHOLD, getAttendanceStatus } from '@/app/components/shared/AttendanceRing';

interface CourseAttendanceSummary {
  id: string;
  courseCode: string;
  courseTitle: string;
  totalSessions: number;
  avgAttendancePercentage: number;
  studentsEnrolled: number;
  studentsBelowThreshold: number;
}

const statusStyles = {
  good: { bar: 'bg-green-600', badge: 'bg-green-100 text-green-700', text: 'Good' },
  warning: { bar: 'bg-yellow-600', badge: 'bg-yellow-100 text-yellow-700', text: 'Watch' },
  critical: { bar: 'bg-red-600', badge: 'bg-red-100 text-red-700', text: 'Critical' },
} as const;

export default function AttendancePage() {
  const [courses, setCourses] = useState<CourseAttendanceSummary[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          id: '1',
          courseCode: 'CSE 101',
          courseTitle: 'Introduction to Programming',
          totalSessions: 24,
          avgAttendancePercentage: 88,
          studentsEnrolled: 42,
          studentsBelowThreshold: 3,
        },
        {
          id: '2',
          courseCode: 'CSE 205',
          courseTitle: 'Data Structures',
          totalSessions: 20,
          avgAttendancePercentage: 71,
          studentsEnrolled: 38,
          studentsBelowThreshold: 11,
        },
        {
          id: '3',
          courseCode: 'CSE 310',
          courseTitle: 'Database Management',
          totalSessions: 16,
          avgAttendancePercentage: 79,
          studentsEnrolled: 40,
          studentsBelowThreshold: 6,
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const totalSessions = courses.reduce((acc, c) => acc + c.totalSessions, 0);
  const overallAvg = courses.length
    ? Math.round(courses.reduce((acc, c) => acc + c.avgAttendancePercentage, 0) / courses.length)
    : 0;
  const totalBelowThreshold = courses.reduce((acc, c) => acc + c.studentsBelowThreshold, 0);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Attendance Management</h1>
        <p className="mt-1 text-gray-600">Session counts and average attendance across your courses.</p>
      </div>

      {/* Summary Stats */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{totalSessions}</p>
            </div>
            <div className="rounded-full bg-navy-50 p-3">
              <CalendarCheck className="h-6 w-6 text-navy-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Across {courses.length} courses</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Attendance</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{overallAvg}%</p>
            </div>
            <div className="rounded-full bg-green-50 p-3">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Threshold: {ATTENDANCE_WARNING_THRESHOLD}%</p>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Students Below Threshold</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{totalBelowThreshold}</p>
            </div>
            <div className="rounded-full bg-red-50 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">Need attention</p>
        </div>
      </div>

      {/* Per-course breakdown */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 flex items-center text-lg font-semibold text-navy-900">
          <Users className="mr-2 h-5 w-5 text-navy-600" />
          Course-wise Attendance
        </h2>

        <div className="space-y-5">
          {courses.map((course) => {
            const status = getAttendanceStatus(course.avgAttendancePercentage);
            const styles = statusStyles[status];
            return (
              <div key={course.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-navy-900">{course.courseCode}</h3>
                      <span className="text-sm text-gray-600">{course.courseTitle}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.badge}`}>{styles.text}</span>
                    </div>
                    <p className="mt-1 text-xs text-gray-500">
                      {course.totalSessions} sessions · {course.studentsEnrolled} students enrolled
                      {course.studentsBelowThreshold > 0 && (
                        <span className="text-red-600"> · {course.studentsBelowThreshold} below {ATTENDANCE_WARNING_THRESHOLD}%</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right text-2xl font-bold text-navy-900 sm:text-3xl">
                    {course.avgAttendancePercentage}%
                  </div>
                </div>
                <div className="mt-3 h-2.5 w-full rounded-full bg-gray-200">
                  <div
                    className={`h-2.5 rounded-full transition-all duration-500 ${styles.bar}`}
                    style={{ width: `${course.avgAttendancePercentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
