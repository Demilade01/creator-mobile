import { Campaign, Submission } from '../types';

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-001',
    brand: 'Nike',
    category: 'Sportswear',
    payout: 120,
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days
    description:
      'Show the world how Nike elevates your everyday training routine. We want raw, authentic workout clips that capture your hustle — sweat, effort, and all.',
    instructions: [
      'Film a 30–60 second vertical video of your workout',
      'Wear at least one visible Nike product throughout',
      'Open with a 3-second close-up of the Nike swoosh',
      'Use trending audio from TikTok\'s "Workout" sound library',
      'End with the CTA: "Train like there\'s no tomorrow"',
    ],
    exampleThumbnails: ['#1A1A2E', '#16213E'],
    exampleVideoUrls: [
      require('../../assets/videos/laravel.mp4'),
      require('../../assets/videos/laravel.mp4'),
    ],
  },
  {
    id: 'camp-002',
    brand: 'Sephora',
    category: 'Beauty',
    payout: 85,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    description:
      'Sephora is launching its summer glow collection. We need creators to showcase a get-ready-with-me transformation using three or more products from the line.',
    instructions: [
      'Start with a bare-face shot, no filters',
      'Feature at least 3 Sephora Collection summer glow products',
      'Narrate your routine in your own voice — no scripted lines',
      'Tag @sephoracollection and use #SephoraGlow in caption',
      'Keep the final look fresh and wearable, not editorial',
    ],
    exampleThumbnails: ['#2D1B4E', '#4A1942'],
    exampleVideoUrls: [
      require('../../assets/videos/laravel.mp4'),
      require('../../assets/videos/laravel.mp4'),
    ],
  },
  {
    id: 'camp-003',
    brand: 'Spotify',
    category: 'Music & Tech',
    payout: 200,
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day — urgent
    description:
      'Spotify wants creators to share the moment a song completely changed their mood. Emotional, relatable, and real — that\'s the vibe.',
    instructions: [
      'Record the exact moment you hit play on a Spotify playlist',
      'Show your genuine emotional reaction — no acting allowed',
      'Include a clear shot of the Spotify app or widget',
      'Video must be between 15 and 30 seconds',
      'Caption must include the playlist name and link',
    ],
    exampleThumbnails: ['#0D2137', '#1A3A2A'],
    exampleVideoUrls: [
      require('../../assets/videos/laravel.mp4'),
      require('../../assets/videos/laravel.mp4'),
    ],
  },
  {
    id: 'camp-004',
    brand: 'GoPro',
    category: 'Adventure',
    payout: 300,
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(), // 14 days
    description:
      'Submit your most breathtaking GoPro moment. Hiking, surfing, skydiving, street skating — if it made your heart race, we want to see it.',
    instructions: [
      'Footage must be shot on a GoPro camera (any model)',
      'At least 50% of clip must be POV (point-of-view) angle',
      'No heavy colour grading — keep it raw and vivid',
      'Add speed ramp effect at the most intense moment',
      'Include your location in the caption',
    ],
    exampleThumbnails: ['#0A2A1A', '#1A2A0A'],
    exampleVideoUrls: [
      require('../../assets/videos/laravel.mp4'),
      require('../../assets/videos/laravel.mp4'),
    ],
  },
  {
    id: 'camp-005',
    brand: 'HelloFresh',
    category: 'Food & Lifestyle',
    payout: 75,
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days
    description:
      'Cook a HelloFresh meal kit from unboxing to plated dish. We want to show how easy it is to create restaurant-quality meals at home in 30 minutes.',
    instructions: [
      'Film the unboxing of your HelloFresh delivery box',
      'Show the full cook — time-lapse or real-time',
      'Must include a close-up "beauty shot" of the plated dish',
      'Mention the meal name and cook time on screen',
      'End with you taking the first bite and reacting',
    ],
    exampleThumbnails: ['#1A2A0F', '#0F1A2A'],
    exampleVideoUrls: [
      require('../../assets/videos/laravel.mp4'),
      require('../../assets/videos/laravel.mp4'),
    ],
  },
];

export const SEEDED_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-seed-001',
    campaignId: 'camp-002',
    url: 'https://www.tiktok.com/@creator/video/7234567890123456789',
    status: 'approved',
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sub-seed-002',
    campaignId: 'camp-004',
    url: 'https://www.instagram.com/reels/CxYz1234567/',
    status: 'rejected',
    submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'sub-seed-003',
    campaignId: 'camp-001',
    url: 'https://www.tiktok.com/@creator/video/7298765432109876543',
    status: 'pending',
    submittedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
];
