'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { BookOpen, Download, Eye } from 'lucide-react';

interface ResourceFile {
  id: string;
  title: string;
  sizeLabel: string;
  date: string;
}

interface CourseResources {
  courseCode: string;
  courseTitle: string;
  files: ResourceFile[];
}

export default function ResourceHubPage() {
  const [courses, setCourses] = useState<CourseResources[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setCourses([
        {
          courseCode: 'CSE-101',
          courseTitle: 'Operating Systems',
          files: [
            { id: '1', title: 'Lecture 04 — Memory Management', sizeLabel: '2.1 MB', date: 'Jul 2' },
            { id: '2', title: 'Lecture 03 — CPU Scheduling', sizeLabel: '1.8 MB', date: 'Jun 28' },
            { id: '3', title: 'Lab Sheet 02 — Process Sync', sizeLabel: '640 KB', date: 'Jun 25' },
          ],
        },
        {
          courseCode: 'MAT-202',
          courseTitle: 'Laplace Transforms',
          files: [
            { id: '4', title: 'Chapter 6 — Laplace Transforms', sizeLabel: '3.4 MB', date: 'Jul 1' },
            { id: '5', title: 'Problem Set 5', sizeLabel: '512 KB', date: 'Jun 27' },
          ],
        },
        {
          courseCode: 'CSE-310',
          courseTitle: 'Computer Networks',
          files: [{ id: '6', title: 'Lecture 05 — Routing Protocols', sizeLabel: '2.6 MB', date: 'Jun 30' }],
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const handleView = (file: ResourceFile) => toast(`Previewing "${file.title}"…`);
  const handleDownload = (file: ResourceFile) => toast.success(`Downloading "${file.title}"…`);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading resources...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Resource Hub</h1>
        <p className="mt-1 text-gray-600">Lecture notes and lab sheets uploaded by your teachers.</p>
      </div>

      {courses.length === 0 ? (
        <p className="text-sm text-gray-500">No resources have been shared yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {courses.map((course) => (
            <div key={course.courseCode} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-navy-600" />
                <div>
                  <span className="block text-xs font-bold tracking-wider text-[#cda252]">{course.courseCode}</span>
                  <h2 className="text-sm font-semibold text-navy-900">{course.courseTitle}</h2>
                </div>
              </div>
              <div className="space-y-2">
                {course.files.map((file) => (
                  <div key={file.id} className="flex items-center justify-between rounded-xl bg-slate-50 p-3 transition-colors hover:bg-slate-100">
                    <div className="min-w-0">
                      <h4 className="truncate text-xs font-medium text-navy-900">{file.title}</h4>
                      <p className="mt-0.5 text-[10px] text-gray-400">
                        {file.sizeLabel} • {file.date}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleView(file)}
                        className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 hover:text-gray-600"
                        aria-label={`Preview ${file.title}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownload(file)}
                        className="rounded-lg border border-gray-200 bg-white p-1.5 text-gray-400 hover:text-gray-600"
                        aria-label={`Download ${file.title}`}
                      >
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
