# 8x Creator Mobile App — Implementation Plan

## Background

Expo SDK 54 project scaffolded with `create-expo-app` in `c:\Users\USER\Desktop\creator-mobile`. The boilerplate uses Expo Router with a `(tabs)` group and a root `_layout.tsx`. We will gut the defaults and build the 4-screen creator submission flow on top.

## Key Tech Decisions

| Concern | Choice | Reason |
|---|---|---|
| Styling | `StyleSheet` only — no NativeWind | Avoids extra Babel config; consistent with existing scaffold |
| Fonts | `@expo-google-fonts/sora` + `expo-font` | Already installed `expo-font` in scaffold |
| State | `React Context` (`SubmissionsContext`) | Per spec; no Redux |
| Routing | Expo Router file-based | Already configured |
| Animations | `Animated` (React Native built-in) for skeleton | No dep needed |

## Proposed Changes

### 1. Install Fonts Package

```
npx expo install @expo-google-fonts/sora
```

### 2. Types & Data Layer

#### [NEW] `src/types/index.ts`
- `Campaign` interface: id, brand, description, payout, deadline (ISO string), category, instructions (string[]), exampleThumbnails (string[])
- `Submission` interface: id, campaignId, url, status (`'pending' | 'approved' | 'rejected'`), submittedAt

#### [NEW] `src/data/campaigns.ts`
- 5 mock campaigns: Nike, Sephora, Spotify, GoPro, HelloFresh  
- 3 pre-seeded submissions (one each: pending, approved, rejected)

### 3. Context

#### [NEW] `src/context/SubmissionsContext.tsx`
- `SubmissionsContext` with `submissions: Submission[]` and `addSubmission(url, campaignId) => void`
- Pre-seeded with the 3 mock submissions

### 4. Components

#### [NEW] `src/components/CampaignCard.tsx`
- Rounded card, cyan glow border, brand name, payout badge, deadline urgency color, category tag

#### [NEW] `src/components/StatusChip.tsx`
- Pill-shaped chip: pending=yellow, approved=green, rejected=red tinted backgrounds

#### [NEW] `src/components/SkeletonCard.tsx`
- Animated shimmer placeholder using `Animated.loop` + interpolated opacity

#### [NEW] `src/components/VideoThumbnail.tsx`
- Tappable thumbnail using `expo-image` or `Image` with a play icon overlay

### 5. Screens (file-based routing)

#### [MODIFY] `app/_layout.tsx`
- Wrap entire tree in `SubmissionsContext.Provider`
- Load Sora fonts with `useFonts`, show `SplashScreen` until ready
- Override dark theme colors to match `#0A0A0F` background

#### [DELETE] `app/(tabs)/_layout.tsx`, `app/(tabs)/explore.tsx`, `app/(tabs)/index.tsx`
- Replace with our own screens

#### [NEW] `app/(tabs)/_layout.tsx`
- Bottom tab navigator: **Campaigns** (icon: `layers`) + **Submissions** (icon: `checkmark-circle`)
- Tab bar background `#0D0D14`, active tint `#00F5FF`

#### [NEW] `app/(tabs)/index.tsx` — Campaigns List
- 300ms fake loading → skeleton cards → real campaign cards
- Header: "3 active campaigns · $240 pending earnings" stat bar

#### [NEW] `app/(tabs)/submissions.tsx` — My Submissions
- Grouped list by campaign name, StatusChip, truncated URL

#### [NEW] `app/campaign/[id].tsx` — Campaign Detail
- Brief, bullet instructions, VideoThumbnail mocks, "Submit a Video" CTA

#### [NEW] `app/campaign/[id]/submit.tsx` — Submit Video URL
- Text input (TikTok / IG URL), validation, success toast, navigate back

### 6. Root Layout Update

#### [MODIFY] `app/_layout.tsx`
- Add `campaign/[id]` and `campaign/[id]/submit` to Stack screens
- Wrap with `SubmissionsProvider`

## Verification Plan

- `npx expo start` — zero red errors in Metro terminal
- Navigate all 4 screens manually via browser/simulator
- Submit a URL → verify toast appears + new submission visible in Submissions tab
- Verify skeleton → real cards transition on Campaigns list
