'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GraduationCap, MessageSquare, Users, X } from 'lucide-react';
import { THESIS_MILESTONES, type MilestoneStage } from '@/app/components/shared/MilestoneTimeline';

type ReviewStatus = 'Reviewed' | 'Pending' | 'Needs Revision';

interface ThesisMilestone {
  name: string;
  status: MilestoneStage;
  reviewStatus?: ReviewStatus;
  feedback?: string;
}

interface ThesisStudent {
  id: string;
  studentName: string;
  studentId: string;
  thesisTitle: string;
  milestones: ThesisMilestone[];
}

const statusStyles: Record<ReviewStatus, string> = {
  Reviewed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  'Needs Revision': 'bg-red-100 text-red-700',
};

function buildMilestones(
  currentIndex: number,
  reviewStatus: ReviewStatus,
  feedbackByName: Record<string, string>,
): ThesisMilestone[] {
  return THESIS_MILESTONES.map((name, index) => ({
    name,
    status: index < currentIndex ? 'completed' : index === currentIndex ? 'current' : 'upcoming',
    reviewStatus: index < currentIndex ? 'Reviewed' : index === currentIndex ? reviewStatus : undefined,
    feedback: feedbackByName[name],
  }));
}

export default function ThesisSyncPage() {
  const [students, setStudents] = useState<ThesisStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setStudents([
        {
          id: '1',
          studentName: 'Md. Rahman',
          studentId: 'CSE-19-045',
          thesisTitle: 'AI in Healthcare Diagnostics',
          milestones: buildMilestones(2, 'Needs Revision', {
            Proposal: 'Clear problem statement. Approved without changes.',
            'Literature Review': 'Good coverage, add 2-3 more recent papers on transformer-based diagnosis.',
            Methodology: 'The evaluation metrics section needs more rigor — compare against at least one baseline model.',
          }),
        },
        {
          id: '2',
          studentName: 'Sadia Akter',
          studentId: 'CSE-19-061',
          thesisTitle: 'Blockchain for Supply Chain',
          milestones: buildMilestones(3, 'Pending', {
            Proposal: 'Solid motivation and scope.',
            'Literature Review': 'Comprehensive, well organized by theme.',
            Methodology: 'Smart contract design is sound. Proceed to implementation.',
          }),
        },
        {
          id: '3',
          studentName: 'Tanvir Ahmed',
          studentId: 'CSE-20-018',
          thesisTitle: 'Computer Vision for Traffic Management',
          milestones: buildMilestones(0, 'Reviewed', {
            Proposal: 'Great scope for a semester project. Approved.',
          }),
        },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const activeStudent = students.find((s) => s.id === activeStudentId) ?? null;

  const saveFeedback = (studentId: string, milestoneName: string, feedback: string, reviewStatus: ReviewStatus) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id !== studentId
          ? student
          : {
              ...student,
              milestones: student.milestones.map((m) => (m.name === milestoneName ? { ...m, feedback, reviewStatus } : m)),
            },
      ),
    );
    toast.success(`Feedback saved for ${milestoneName}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading thesis sync...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Thesis Sync</h1>
        <p className="mt-1 text-gray-600">Track supervised students and give milestone feedback.</p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 flex items-center text-lg font-semibold text-navy-900">
          <Users className="mr-2 h-5 w-5 text-navy-600" />
          Supervised Students
        </h2>

        <div className="space-y-4">
          {students.map((student) => {
            const current = student.milestones.find((m) => m.status === 'current');
            const reviewStatus = current?.reviewStatus ?? 'Reviewed';
            return (
              <div key={student.id} className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-navy-900">{student.studentName}</h3>
                      <span className="text-xs text-gray-400">{student.studentId}</span>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[reviewStatus]}`}>
                        {reviewStatus}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{student.thesisTitle}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Current milestone: <span className="font-medium text-navy-700">{current?.name ?? 'Completed'}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveStudentId(student.id)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-navy-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-navy-700"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Give Feedback
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {activeStudent && (
        <FeedbackModal student={activeStudent} onClose={() => setActiveStudentId(null)} onSave={saveFeedback} />
      )}
    </div>
  );
}

function FeedbackModal({
  student,
  onClose,
  onSave,
}: {
  student: ThesisStudent;
  onClose: () => void;
  onSave: (studentId: string, milestoneName: string, feedback: string, reviewStatus: ReviewStatus) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="flex items-center gap-2 text-xl font-bold text-navy-900">
              <GraduationCap className="h-5 w-5 text-navy-600" />
              {student.studentName}
            </h3>
            <p className="text-sm text-gray-600">{student.thesisTitle}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {student.milestones.map((milestone) =>
            milestone.status === 'upcoming' ? (
              <div key={milestone.name} className="rounded-lg border border-dashed border-gray-200 p-4 text-sm text-gray-400">
                <span className="font-medium">{milestone.name}</span> — not yet submitted
              </div>
            ) : (
              <MilestoneFeedbackRow
                key={milestone.name}
                studentId={student.id}
                milestone={milestone}
                onSave={onSave}
              />
            ),
          )}
        </div>
      </div>
    </div>
  );
}

function MilestoneFeedbackRow({
  studentId,
  milestone,
  onSave,
}: {
  studentId: string;
  milestone: ThesisMilestone;
  onSave: (studentId: string, milestoneName: string, feedback: string, reviewStatus: ReviewStatus) => void;
}) {
  const [feedback, setFeedback] = useState(milestone.feedback ?? '');
  const [reviewStatus, setReviewStatus] = useState<ReviewStatus>(milestone.reviewStatus ?? 'Pending');

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <span className="font-medium text-navy-900">{milestone.name}</span>
        <select
          value={reviewStatus}
          onChange={(e) => setReviewStatus(e.target.value as ReviewStatus)}
          className={`rounded-full border-0 px-2 py-1 text-xs font-medium focus:ring-2 focus:ring-navy-500 ${statusStyles[reviewStatus]}`}
        >
          <option value="Reviewed">Reviewed</option>
          <option value="Pending">Pending</option>
          <option value="Needs Revision">Needs Revision</option>
        </select>
      </div>
      <textarea
        rows={2}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        placeholder="Write feedback for this milestone..."
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-navy-500"
      />
      <div className="mt-2 flex justify-end">
        <button
          onClick={() => onSave(studentId, milestone.name, feedback, reviewStatus)}
          className="rounded-lg bg-navy-600 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-navy-700"
        >
          Save
        </button>
      </div>
    </div>
  );
}
