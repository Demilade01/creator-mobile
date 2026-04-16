import React, { createContext, useCallback, useContext, useState } from 'react';
import { SEEDED_SUBMISSIONS } from '../data/campaigns';
import { Submission, SubmissionStatus } from '../types';

interface SubmissionsContextValue {
  submissions: Submission[];
  addSubmission: (campaignId: string, url: string) => void;
}

const SubmissionsContext = createContext<SubmissionsContextValue | undefined>(undefined);

let submissionCounter = 100;

export function SubmissionsProvider({ children }: { children: React.ReactNode }) {
  const [submissions, setSubmissions] = useState<Submission[]>(SEEDED_SUBMISSIONS);

  const addSubmission = useCallback((campaignId: string, url: string) => {
    const newSubmission: Submission = {
      id: `sub-${++submissionCounter}`,
      campaignId,
      url,
      status: 'pending' as SubmissionStatus,
      submittedAt: new Date().toISOString(),
    };
    setSubmissions((prev) => [newSubmission, ...prev]);
  }, []);

  return (
    <SubmissionsContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionsContext.Provider>
  );
}

export function useSubmissions(): SubmissionsContextValue {
  const ctx = useContext(SubmissionsContext);
  if (!ctx) {
    throw new Error('useSubmissions must be used inside <SubmissionsProvider>');
  }
  return ctx;
}
