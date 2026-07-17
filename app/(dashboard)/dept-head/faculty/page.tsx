'use client';

import { useEffect, useState } from 'react';
import { ChevronRight, Users, X } from 'lucide-react';
import FacultyProfileCard, { type Faculty } from '@/app/components/shared/FacultyProfileCard';

function progressColor(percentage: number) {
  if (percentage >= 80) return 'bg-green-600';
  if (percentage >= 60) return 'bg-blue-600';
  if (percentage >= 40) return 'bg-yellow-600';
  return 'bg-red-600';
}

const MOCK_FACULTY: Faculty[] = [
  {
    id: '1',
    name: 'Dr. Nasrin Sultana',
    designation: 'Associate Professor',
    officeRoom: 'Room 412, CSE Building',
    email: 'nasrin.sultana@university.edu',
    phone: '+880 1711-234567',
    expertise: ['Machine Learning', 'Computer Vision', 'Data Mining'],
    weeklyProgressTrend: [58, 62, 65, 70, 74, 76],
    courses: [
      { id: 'c1', courseCode: 'CSE 101', courseTitle: 'Introduction to Programming', progress: 88 },
      { id: 'c2', courseCode: 'CSE 402', courseTitle: 'Machine Learning', progress: 64 },
    ],
  },
  {
    id: '2',
    name: 'Md. Kamrul Hassan',
    designation: 'Assistant Professor',
    officeRoom: 'Room 308, CSE Building',
    email: 'kamrul.hassan@university.edu',
    phone: '+880 1811-345678',
    expertise: ['Data Structures', 'Algorithms', 'Competitive Programming'],
    weeklyProgressTrend: [40, 45, 48, 50, 55, 58],
    courses: [{ id: 'c3', courseCode: 'CSE 205', courseTitle: 'Data Structures', progress: 58 }],
  },
  {
    id: '3',
    name: 'Farhana Yasmin',
    designation: 'Lecturer',
    officeRoom: 'Room 210, CSE Building',
    email: 'farhana.yasmin@university.edu',
    phone: '+880 1911-456789',
    expertise: ['Database Systems', 'Distributed Systems'],
    weeklyProgressTrend: [65, 68, 70, 74, 78, 82],
    courses: [
      { id: 'c4', courseCode: 'CSE 310', courseTitle: 'Database Management', progress: 79 },
      { id: 'c5', courseCode: 'CSE 415', courseTitle: 'Distributed Systems', progress: 82 },
    ],
  },
  {
    id: '4',
    name: 'Rezaul Karim',
    designation: 'Professor',
    officeRoom: 'Room 501, CSE Building',
    email: 'rezaul.karim@university.edu',
    phone: '+880 1611-567890',
    expertise: ['Networking', 'Operating Systems', 'Cybersecurity'],
    weeklyProgressTrend: [70, 72, 71, 74, 76, 77],
    courses: [{ id: 'c6', courseCode: 'CSE 320', courseTitle: 'Operating Systems', progress: 77 }],
  },
];

function overallCompletion(faculty: Faculty) {
  if (faculty.courses.length === 0) return 0;
  return Math.round(faculty.courses.reduce((acc, c) => acc + c.progress, 0) / faculty.courses.length);
}

export default function FacultyPage() {
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFacultyId, setActiveFacultyId] = useState<string | null>(null);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setFaculty(MOCK_FACULTY);
      setLoading(false);
    }, 800);
  }, []);

  const activeFaculty = faculty.find((f) => f.id === activeFacultyId) ?? null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading faculty directory...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Faculty Directory</h1>
        <p className="mt-1 text-gray-600">Syllabus completion across your department&apos;s faculty.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 flex items-center text-lg font-semibold text-navy-900">
          <Users className="mr-2 h-5 w-5 text-navy-600" />
          Faculty ({faculty.length})
        </h2>

        <div className="space-y-4">
          {faculty.map((f) => {
            const completion = overallCompletion(f);
            return (
              <button
                key={f.id}
                onClick={() => setActiveFacultyId(f.id)}
                className="flex w-full flex-col gap-3 rounded-lg border border-gray-200 p-4 text-left transition-colors hover:border-navy-300 hover:bg-navy-50/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <h3 className="font-bold text-navy-900">{f.name}</h3>
                  <p className="text-sm text-gray-600">{f.designation}</p>
                </div>
                <div className="flex items-center gap-4 sm:w-72">
                  <div className="h-2.5 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${progressColor(completion)}`}
                      style={{ width: `${completion}%` }}
                    ></div>
                  </div>
                  <span className="w-12 shrink-0 text-right text-sm font-semibold text-navy-900">{completion}%</span>
                  <ChevronRight className="h-5 w-5 shrink-0 text-gray-400" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => setActiveFacultyId(null)}
                aria-label="Close"
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <FacultyProfileCard faculty={activeFaculty} />
          </div>
        </div>
      )}
    </div>
  );
}
