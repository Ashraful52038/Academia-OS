'use client';

import { useEffect, useState } from 'react';
import FacultyProfileCard, { type Faculty } from '@/app/components/shared/FacultyProfileCard';

const MOCK_SELF: Faculty = {
  id: 'self',
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
};

export default function TeacherProfilePage() {
  const [faculty, setFaculty] = useState<Faculty | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setFaculty(MOCK_SELF);
      setLoading(false);
    }, 800);
  }, []);

  if (loading || !faculty) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">My Profile</h1>
        <p className="mt-1 text-gray-600">Your profile, expertise, and teaching progress.</p>
      </div>

      <div className="max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <FacultyProfileCard faculty={faculty} />
      </div>
    </div>
  );
}
