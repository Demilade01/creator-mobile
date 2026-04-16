# 8x Creator Mobile

A polished creator submission flow built with **Expo + React Native + TypeScript**.

---

## Screens

| Screen | Route | Description |
|---|---|---|
| Campaigns List | `/` | Stats header, skeleton loader, campaign cards with urgency deadline coloring |
| Campaign Detail | `/campaign/[id]` | Brand brief, numbered instructions, example video thumbnails, Submit CTA |
| Submit Video | `/campaign/[id]/submit` | URL input, TikTok/Instagram validation, success toast, saves to global state |
| My Submissions | `/submissions` | Grouped by campaign, status chips (pending / approved / rejected) |

---

## Tech Stack

- **Expo SDK 54** + **Expo Router** (file-based routing)
- **TypeScript** throughout — strict mode
- **React Context** (`SubmissionsContext`) for global submissions state — no Redux
- **StyleSheet** API for styling — no NativeWind
- **Sora** via `@expo-google-fonts/sora`
- Mocked data only — no backend, no auth, no API calls

---

## Project Structure

```
/app
  _layout.tsx               ← Root layout: fonts, SubmissionsProvider, Stack
  (tabs)/
    _layout.tsx             ← Bottom tab navigator
    index.tsx               ← Campaigns List screen
    submissions.tsx         ← My Submissions screen
  campaign/
    [id].tsx                ← Campaign Detail screen
    [id]/submit.tsx         ← Submit Video URL screen

/src
  types/index.ts            ← Campaign & Submission interfaces
  data/campaigns.ts         ← 5 mock campaigns + 3 pre-seeded submissions
  context/
    SubmissionsContext.tsx  ← Global state + addSubmission action
  components/
    CampaignCard.tsx        ← Card with glow border, payout badge, deadline urgency
    StatusChip.tsx          ← Pill chip: pending / approved / rejected
    SkeletonCard.tsx        ← Animated shimmer placeholder
    VideoThumbnail.tsx      ← Tappable thumbnail with play button overlay
```

---

## Design System

| Token | Value |
|---|---|
| Background | `#0A0A0F` |
| Accent / CTA | `#00F5FF` (electric cyan) |
| Approved | `#00E676` |
| Pending | `#FFB800` |
| Rejected / Urgent | `#FF4D4D` |
| Font | Sora (400 · 500 · 600 · 700) |

---

## Getting Started

```bash
# Install dependencies
npm install

# Start Metro
npx expo start
```

Scan the QR code with **Expo Go** (iOS / Android) or press `w` for web.

---

## Mock Data

- **5 campaigns**: Nike, Sephora, Spotify, GoPro, HelloFresh
- **3 pre-seeded submissions**: one `approved`, one `rejected`, one `pending` — so the Submissions tab is never empty on first launch
- Deadlines are set dynamically relative to `Date.now()` so urgency colors are always meaningful
