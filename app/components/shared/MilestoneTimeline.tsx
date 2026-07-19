'use client';

import { CheckCircle2 } from 'lucide-react';
import { Fragment } from 'react';

export const THESIS_MILESTONES = [
  'Proposal',
  'Literature Review',
  'Methodology',
  'Implementation',
  'Final Defense',
] as const;

export type MilestoneStage = 'completed' | 'current' | 'upcoming';

interface MilestoneTimelineProps {
  milestones: { name: string; status: MilestoneStage }[];
}

export default function MilestoneTimeline({ milestones }: MilestoneTimelineProps) {
  return (
    <div className="flex items-start overflow-x-auto pb-1">
      {milestones.map((milestone, index) => {
        const isLast = index === milestones.length - 1;
        return (
          <Fragment key={milestone.name}>
            <div className="flex shrink-0 flex-col items-center" style={{ width: 112 }}>
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                  milestone.status === 'completed'
                    ? 'border-green-600 bg-green-600 text-white'
                    : milestone.status === 'current'
                    ? 'border-navy-600 bg-white text-navy-600 ring-4 ring-navy-100'
                    : 'border-gray-300 bg-white text-gray-400'
                }`}
              >
                {milestone.status === 'completed' ? <CheckCircle2 className="h-5 w-5" /> : index + 1}
              </div>
              <p
                className={`mt-2 text-center text-xs font-medium ${
                  milestone.status === 'upcoming' ? 'text-gray-400' : 'text-navy-900'
                }`}
              >
                {milestone.name}
              </p>
              {milestone.status === 'current' && <span className="mt-0.5 text-[10px] font-medium text-navy-600">In progress</span>}
            </div>
            {!isLast && (
              <div className={`mt-5 h-0.5 min-w-[24px] flex-1 ${milestone.status === 'completed' ? 'bg-green-600' : 'bg-gray-200'}`} />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
