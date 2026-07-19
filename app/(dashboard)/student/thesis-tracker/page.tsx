'use client';

import { useEffect, useState } from 'react';
import { GraduationCap, MessageSquare } from 'lucide-react';
import MilestoneTimeline, { THESIS_MILESTONES, type MilestoneStage } from '@/app/components/shared/MilestoneTimeline';

type ReviewStatus = 'Reviewed' | 'Pending' | 'Needs Revision';

interface ThesisMilestone {
  name: string;
  status: MilestoneStage;
  reviewStatus?: ReviewStatus;
  feedback?: string;
  reviewedAt?: string;
}

const statusStyles: Record<ReviewStatus, string> = {
  Reviewed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  'Needs Revision': 'bg-red-100 text-red-700',
};

export default function ThesisTrackerPage() {
  const [thesisTitle, setThesisTitle] = useState('');
  const [milestones, setMilestones] = useState<ThesisMilestone[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - Replace with API call
  useEffect(() => {
    setTimeout(() => {
      setThesisTitle('AI in Healthcare Diagnostics');
      setMilestones([
        {
          name: THESIS_MILESTONES[0],
          status: 'completed',
          reviewStatus: 'Reviewed',
          feedback: 'Clear problem statement. Approved without changes.',
          reviewedAt: '2025-11-02T10:00:00Z',
        },
        {
          name: THESIS_MILESTONES[1],
          status: 'completed',
          reviewStatus: 'Reviewed',
          feedback: 'Good coverage, add 2-3 more recent papers on transformer-based diagnosis.',
          reviewedAt: '2026-01-18T14:30:00Z',
        },
        {
          name: THESIS_MILESTONES[2],
          status: 'current',
          reviewStatus: 'Needs Revision',
          feedback: 'The evaluation metrics section needs more rigor — compare against at least one baseline model.',
          reviewedAt: '2026-06-30T09:15:00Z',
        },
        { name: THESIS_MILESTONES[3], status: 'upcoming' },
        { name: THESIS_MILESTONES[4], status: 'upcoming' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const reviewedMilestones = milestones.filter((m) => m.feedback);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-navy-600"></div>
          <p className="mt-4 text-gray-600">Loading thesis progress...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold text-navy-900">Thesis Tracker</h1>
        <p className="mt-1 flex items-center gap-2 text-gray-600">
          <GraduationCap className="h-4 w-4" />
          {thesisTitle}
        </p>
      </div>

      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-lg font-semibold text-navy-900">Milestone Progress</h2>
        <MilestoneTimeline milestones={milestones} />
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="mb-6 flex items-center text-lg font-semibold text-navy-900">
          <MessageSquare className="mr-2 h-5 w-5 text-navy-600" />
          Supervisor Feedback
        </h2>

        {reviewedMilestones.length > 0 ? (
          <div className="space-y-4">
            {reviewedMilestones.map((milestone) => (
              <div key={milestone.name} className="rounded-lg border border-gray-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium text-navy-900">{milestone.name}</span>
                  <div className="flex items-center gap-2">
                    {milestone.reviewStatus && (
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[milestone.reviewStatus]}`}>
                        {milestone.reviewStatus}
                      </span>
                    )}
                    {milestone.reviewedAt && (
                      <span className="text-xs text-gray-400">
                        {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
                          new Date(milestone.reviewedAt),
                        )}
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">{milestone.feedback}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No feedback yet.</p>
        )}
      </div>
    </div>
  );
}
