# Drillion

A daily word game. 7 prompts, one answer each, 25 seconds per answer. Rare answers drill deeper.

- **Today's dig** (`/`): the same 7 prompts for everyone, once a day, with a streak and a share card.
- **Unlimited** (`/unlimited`): endless digs from the whole prompt pool. Free.
- **Archive** (`/archive`): every past daily, still playable.
- **Themed packs** (`/packs`): 7 topics, 12 chapters each.

## Run it

```bash
npm install
npm run dev
```

## How it works

- Prompts live in `src/lib/prompts.ts`, answers ordered from most to least common. Position sets the tier: Topsoil 10, Clay 25, Bedrock 50, Magma 80, Drillion 120.
- Every point drills 15 m. A perfect dig reaches 12,600 m. Depth zones and landmarks are in `src/lib/depth.ts`.
- All art is hand-drawn pixel grids in `src/components/sprite.tsx`.
- Progress, streaks and stats are stored in localStorage. No backend yet.
