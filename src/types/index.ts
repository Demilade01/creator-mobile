export type SubmissionStatus = 'pending' | 'approved' | 'rejected';

export interface Campaign {
  id: string;
  brand: string;
  category: string;
  payout: number; // USD per video
  deadline: string; // ISO date string
  description: string;
  instructions: string[];
  /** Hex colour strings used as placeholder thumbnail backgrounds */
  exampleThumbnails: string[];
  /** Real example video URLs or require() references */
  exampleVideoUrls: (string | number)[];
}

export interface Submission {
  id: string;
  campaignId: string;
  url: string;
  status: SubmissionStatus;
  submittedAt: string; // ISO date string
}
