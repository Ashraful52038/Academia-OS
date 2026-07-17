'use client';

import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { AlertTriangle, CalendarCheck, CheckCircle2 } from 'lucide-react';
import AttendanceRing, {
  ATTENDANCE_WARNING_THRESHOLD,
  getAttendanceStatus,
} from '@/app/components/shared/AttendanceRing';

interface CourseAttendance {
  id: string;
  courseCode: string;
  courseTitle: string;
  totalSessions: number;
  attendedSessions: number;
}

const statusBadge = {
  good: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-700',
  critical: 'bg-red-100 text-red-700',
} as const;

export default function StudentAttendancePage() {
  const [courses, setCourses] = useState<CourseAttendance[]>([]);
  const [loading, setLoading] = useState(true);
  const hasNotified = useRef(false);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        { id: '1', courseCode: 'CSE 101', courseTitle: 'Introduction to Programming', totalSessions: 24, attendedSessions: 22 },
        { id: '2', courseCode: 'CSE 205', courseTitle: 'Data Structures', totalSessions: 20, attendedSessions: 14 },
        { id: '3', courseCode: 'CSE 310', courseTitle: 'Database Management', totalSessions: 16, attendedSessions: 13 },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const withPercentage = courses.map((c) => ({
    ...c,
    percentage: c.totalSessions ? Math.round((c.attendedSessions / c.totalSessions) * 100) : 0,
  }));

  const totalAttended = courses.reduce((acc, c) => acc + c.attendedSessions, 0);
  const totalSessions = courses.reduce((acc, c) => acc + c.totalSessions, 0);
  const overallPercentage = totalSessions ? Math.round((totalAttended / totalSessions) * 100) : 0;

  const lowAttendanceCourses = withPercentage.filter((c) => c.percentage < ATTENDANCE_WARNING_THRESHOLD);

  // FR-5.3: notify the student when attendance drops below the threshold
  useEffect(() => {
    if (loading || hasNotified.current || lowAttendanceCourses.length === 0) return;
    hasNotified.current = true;
    const names = lowAttendanceCourses.map((c) => c.courseCode).join(', ');
    toast.error(`Low attendance warning: ${names} below ${ATTENDANCE_WARNING_THRESHOLD}%`, { duration: 6000 });
  }, [loading, lowAttendanceCourses]);

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
        <h1 className="text-3xl font-serif font-bold text-navy-900">My Attendance</h1>
        <p className="mt-1 text-gray-600">Your overall and course-wise attendance record.</p>
      </div>

      {lowAttendanceCourses.length > 0 && (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="font-medium text-red-800">
              Attendance below {ATTENDANCE_WARNING_THRESHOLD}% in {lowAttendanceCourses.length}{' '}
              {lowAttendanceCourses.length === 1 ? 'course' : 'courses'}
            </p>
            <p className="mt-0.5 text-sm text-red-700">
              {lowAttendanceCourses.map((c) => `${c.courseCode} (${c.percentage}%)`).join(', ')}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Overall attendance */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 flex items-center text-lg font-semibold text-navy-900">
            <CalendarCheck className="mr-2 h-5 w-5 text-navy-600" />
            Overall Attendance
          </h2>
          <AttendanceRing percentage={overallPercentage} size={160} label="overall" />
          <p className="mt-4 text-sm text-gray-600">
            {totalAttended} of {totalSessions} sessions attended
          </p>
          {overallPercentage >= ATTENDANCE_WARNING_THRESHOLD ? (
            <div className="mt-2 flex items-center gap-1 text-sm text-green-600">
              <CheckCircle2 className="h-4 w-4" /> On track
            </div>
          ) : (
            <div className="mt-2 flex items-center gap-1 text-sm text-red-600">
              <AlertTriangle className="h-4 w-4" /> Below threshold
            </div>
          )}
        </div>

        {/* Per-course breakdown */}
        <div className="lg:col-span-2 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-lg font-semibold text-navy-900">Course-wise Attendance</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {withPercentage.map((course) => {
              const status = getAttendanceStatus(course.percentage);
              return (
                <div key={course.id} className="flex items-center gap-4 rounded-lg border border-gray-200 p-4">
                  <AttendanceRing percentage={course.percentage} size={80} strokeWidth={8} />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-navy-900">{course.courseCode}</h3>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[status]}`}>
                        {status === 'good' ? 'Good' : status === 'warning' ? 'Watch' : 'Critical'}
                      </span>
                    </div>
                    <p className="truncate text-sm text-gray-600">{course.courseTitle}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {course.attendedSessions} of {course.totalSessions} sessions
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
