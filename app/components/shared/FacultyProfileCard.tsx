'use client';

import { Mail, MapPin, Phone } from 'lucide-react';
import Sparkline from '@/app/components/shared/Sparkline';

export interface FacultyCourse {
  id: string;
  courseCode: string;
  courseTitle: string;
  progress: number;
}

export interface Faculty {
  id: string;
  name: string;
  designation: string;
  officeRoom: string;
  email: string;
  phone: string;
  expertise: string[];
  weeklyProgressTrend: number[];
  courses: FacultyCourse[];
}

function progressColor(percentage: number) {
  if (percentage >= 80) return 'bg-green-600';
  if (percentage >= 60) return 'bg-blue-600';
  if (percentage >= 40) return 'bg-yellow-600';
  return 'bg-red-600';
}

function initials(name: string) {
  return name
    .replace(/^(Dr\.|Md\.|Mr\.|Ms\.)\s*/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function FacultyProfileCard({ faculty }: { faculty: Faculty }) {
  const trend = faculty.weeklyProgressTrend;
  const trendChange = trend.length >= 2 ? trend[trend.length - 1] - trend[0] : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-navy-50 text-xl font-bold text-navy-700">
          {initials(faculty.name)}
        </span>
        <div>
          <h3 className="text-xl font-bold text-navy-900">{faculty.name}</h3>
          <p className="text-sm text-gray-600">{faculty.designation}</p>
        </div>
      </div>

      {/* Contact info */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm">
          <MapPin className="h-4 w-4 shrink-0 text-navy-600" />
          <span className="text-gray-700">{faculty.officeRoom}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm">
          <Mail className="h-4 w-4 shrink-0 text-navy-600" />
          <span className="truncate text-gray-700">{faculty.email}</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-gray-200 p-3 text-sm">
          <Phone className="h-4 w-4 shrink-0 text-navy-600" />
          <span className="text-gray-700">{faculty.phone}</span>
        </div>
      </div>

      {/* Expertise */}
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600">Areas of Expertise</p>
        <div className="flex flex-wrap gap-2">
          {faculty.expertise.map((area) => (
            <span key={area} className="rounded-full bg-navy-50 px-3 py-1 text-xs font-medium text-navy-700">
              {area}
            </span>
          ))}
        </div>
      </div>

      {/* Syllabus progress trend */}
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-600">Syllabus Progress Trend (last {trend.length} weeks)</p>
          <span className={`text-sm font-semibold ${trendChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trendChange >= 0 ? '+' : ''}
            {trendChange}% since week 1
          </span>
        </div>
        <div className="mt-3">
          <Sparkline data={trend} />
        </div>
      </div>

      {/* Courses taught */}
      <div>
        <p className="mb-3 text-sm font-medium text-gray-600">Courses Taught</p>
        <div className="space-y-3">
          {faculty.courses.map((course) => (
            <div key={course.id}>
              <div className="mb-1 flex items-center justify-between text-sm">
                <span className="font-medium text-navy-900">
                  {course.courseCode} — {course.courseTitle}
                </span>
                <span className="text-gray-600">{course.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                  className={`h-2 rounded-full transition-all duration-500 ${progressColor(course.progress)}`}
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
