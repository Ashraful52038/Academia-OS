'use client';

import { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, CalendarRange, CheckCircle2 } from 'lucide-react';

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'] as const;
const PERIODS = [
  { id: 1, time: '9:00 - 10:30' },
  { id: 2, time: '10:30 - 12:00' },
  { id: 3, time: '12:00 - 1:30' },
  { id: 4, time: '2:00 - 3:30' },
  { id: 5, time: '3:30 - 5:00' },
];

interface RoutineSession {
  id: string;
  day: (typeof DAYS)[number];
  periodId: number;
  courseCode: string;
  teacherName: string;
  room: string;
  section: string;
  autoResolvedNote?: string;
}

const MOCK_SESSIONS: RoutineSession[] = [
  // Sunday
  { id: 's1', day: 'Sunday', periodId: 1, courseCode: 'CSE 101', teacherName: 'Dr. Nasrin Sultana', room: 'Room 301', section: 'CSE-2A' },
  { id: 's2', day: 'Sunday', periodId: 2, courseCode: 'CSE 101', teacherName: 'Dr. Nasrin Sultana', room: 'Room 301', section: 'CSE-2A' },
  { id: 's3', day: 'Sunday', periodId: 2, courseCode: 'CSE 205', teacherName: 'Md. Kamrul Hassan', room: 'Room 301', section: 'CSE-3A' },
  { id: 's4', day: 'Sunday', periodId: 3, courseCode: 'CSE 310', teacherName: 'Farhana Yasmin', room: 'Room 205', section: 'CSE-3B' },
  { id: 's5', day: 'Sunday', periodId: 4, courseCode: 'CSE 320', teacherName: 'Rezaul Karim', room: 'Room 401', section: 'CSE-2B' },

  // Monday
  { id: 'm1', day: 'Monday', periodId: 1, courseCode: 'CSE 205', teacherName: 'Md. Kamrul Hassan', room: 'Room 205', section: 'CSE-3A' },
  { id: 'm2', day: 'Monday', periodId: 2, courseCode: 'CSE 402', teacherName: 'Dr. Nasrin Sultana', room: 'Room 412', section: 'CSE-4A' },
  {
    id: 'm3',
    day: 'Monday',
    periodId: 3,
    courseCode: 'CSE 310',
    teacherName: 'Farhana Yasmin',
    room: 'Room 205',
    section: 'CSE-3B',
  },
  {
    id: 'm4',
    day: 'Monday',
    periodId: 3,
    courseCode: 'CSE 415',
    teacherName: 'Farhana Yasmin',
    room: 'Room 401',
    section: 'CSE-2B',
  },
  { id: 'm5', day: 'Monday', periodId: 4, courseCode: 'CSE 320', teacherName: 'Rezaul Karim', room: 'Room 301', section: 'CSE-2B' },

  // Tuesday
  {
    id: 't1',
    day: 'Tuesday',
    periodId: 1,
    courseCode: 'CSE 101',
    teacherName: 'Dr. Nasrin Sultana',
    room: 'Room 205',
    section: 'CSE-2A',
    autoResolvedNote: 'Auto-resolved: room reassigned from 301 to 205 to avoid a clash with CSE 310',
  },
  { id: 't2', day: 'Tuesday', periodId: 2, courseCode: 'CSE 205', teacherName: 'Md. Kamrul Hassan', room: 'Room 301', section: 'CSE-3A' },
  { id: 't3', day: 'Tuesday', periodId: 3, courseCode: 'CSE 415', teacherName: 'Farhana Yasmin', room: 'Room 401', section: 'CSE-2B' },
  { id: 't4', day: 'Tuesday', periodId: 5, courseCode: 'CSE 320', teacherName: 'Rezaul Karim', room: 'Room 401', section: 'CSE-2B' },

  // Wednesday
  { id: 'w1', day: 'Wednesday', periodId: 1, courseCode: 'CSE 310', teacherName: 'Farhana Yasmin', room: 'Room 205', section: 'CSE-3B' },
  { id: 'w2', day: 'Wednesday', periodId: 2, courseCode: 'CSE 101', teacherName: 'Dr. Nasrin Sultana', room: 'Room 301', section: 'CSE-2A' },
  { id: 'w3', day: 'Wednesday', periodId: 3, courseCode: 'CSE 205', teacherName: 'Md. Kamrul Hassan', room: 'Room 205', section: 'CSE-3A' },
  { id: 'w4', day: 'Wednesday', periodId: 4, courseCode: 'CSE 402', teacherName: 'Dr. Nasrin Sultana', room: 'Room 412', section: 'CSE-4A' },

  // Thursday
  { id: 'th1', day: 'Thursday', periodId: 1, courseCode: 'CSE 320', teacherName: 'Rezaul Karim', room: 'Room 401', section: 'CSE-2B' },
  { id: 'th2', day: 'Thursday', periodId: 2, courseCode: 'CSE 415', teacherName: 'Farhana Yasmin', room: 'Room 401', section: 'CSE-2B' },
  { id: 'th3', day: 'Thursday', periodId: 3, courseCode: 'CSE 101', teacherName: 'Dr. Nasrin Sultana', room: 'Room 301', section: 'CSE-2A' },
];

type ConflictDimension = 'room' | 'teacher' | 'section';

function useConflictMap(sessions: RoutineSession[]) {
  return useMemo(() => {
    const groups: Record<ConflictDimension, Map<string, RoutineSession[]>> = {
      room: new Map(),
      teacher: new Map(),
      section: new Map(),
    };

    sessions.forEach((session) => {
      const slot = `${session.day}-${session.periodId}`;
      (['room', 'teacher', 'section'] as const).forEach((dim) => {
        const value = dim === 'room' ? session.room : dim === 'teacher' ? session.teacherName : session.section;
        const key = `${slot}|${value}`;
        const list = groups[dim].get(key) ?? [];
        list.push(session);
        groups[dim].set(key, list);
      });
    });

    const conflicts = new Map<string, ConflictDimension[]>();
    (['room', 'teacher', 'section'] as const).forEach((dim) => {
      groups[dim].forEach((list) => {
        if (list.length > 1) {
          list.forEach((session) => {
            const reasons = conflicts.get(session.id) ?? [];
            reasons.push(dim);
            conflicts.set(session.id, reasons);
          });
        }
      });
    });

    return conflicts;
  }, [sessions]);
}

export default function RoutinePage() {
  const [sessions, setSessions] = useState<RoutineSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setSessions(MOCK_SESSIONS);
      setLoading(false);
    }, 800);
  }, []);

  const conflictMap = useConflictMap(sessions);
  const conflictSessionIds = new Set(
    sessions.filter((s) => !s.autoResolvedNote && (conflictMap.get(s.id)?.length ?? 0) > 0).map((s) => s.id),
  );
  const autoResolvedCount = sessions.filter((s) => s.autoResolvedNote).length;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading routine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Conflict-Free Routine</h1>
        <p className="mt-1 text-gray-600">Weekly class schedule with automatic room, teacher, and section conflict detection.</p>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Sessions</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{sessions.length}</p>
            </div>
            <div className="rounded-full bg-navy-50 p-3">
              <CalendarRange className="h-6 w-6 text-navy-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conflicts Detected</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{conflictSessionIds.size}</p>
            </div>
            <div className="rounded-full bg-red-50 p-3">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Auto-Resolved</p>
              <p className="mt-1 text-3xl font-bold text-navy-900">{autoResolvedCount}</p>
            </div>
            <div className="rounded-full bg-blue-50 p-3">
              <CheckCircle2 className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border border-navy-200 bg-navy-50"></span> Normal
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border border-red-400 bg-red-50"></span> Conflict detected
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded border border-blue-400 bg-blue-50"></span> Auto-resolved
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="w-32 border border-gray-200 bg-gray-50 p-2 text-left font-medium text-gray-600">Period</th>
                {DAYS.map((day) => (
                  <th key={day} className="border border-gray-200 bg-gray-50 p-2 text-left font-medium text-gray-600">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PERIODS.map((period) => (
                <tr key={period.id}>
                  <td className="border border-gray-200 p-2 align-top text-xs text-gray-500">{period.time}</td>
                  {DAYS.map((day) => {
                    const cellSessions = sessions.filter((s) => s.day === day && s.periodId === period.id);
                    return (
                      <td key={day} className="min-w-[160px] border border-gray-200 p-2 align-top">
                        <div className="flex flex-col gap-1.5">
                          {cellSessions.map((session) => {
                            const reasons = conflictMap.get(session.id) ?? [];
                            const isConflict = !session.autoResolvedNote && reasons.length > 0;
                            const isAutoResolved = Boolean(session.autoResolvedNote);
                            return (
                              <div
                                key={session.id}
                                title={
                                  isConflict
                                    ? `Conflict: ${reasons.join(', ')}`
                                    : isAutoResolved
                                    ? session.autoResolvedNote
                                    : undefined
                                }
                                className={`rounded-lg border p-2 text-xs ${
                                  isConflict
                                    ? 'border-red-400 bg-red-50 text-red-800'
                                    : isAutoResolved
                                    ? 'border-blue-400 bg-blue-50 text-blue-800'
                                    : 'border-navy-200 bg-navy-50 text-navy-900'
                                }`}
                              >
                                <div className="flex items-center gap-1 font-semibold">
                                  {isConflict && <AlertTriangle className="h-3 w-3 shrink-0" />}
                                  {isAutoResolved && <CheckCircle2 className="h-3 w-3 shrink-0" />}
                                  {session.courseCode}
                                </div>
                                <p className="mt-0.5">{session.teacherName}</p>
                                <p className="text-[11px] opacity-80">
                                  {session.room} · {session.section}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
