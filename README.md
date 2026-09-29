# Drillion

A word game: one prompt, 60 seconds, type as many answers as you can. Rare answers drill deeper and score more.

- **Daily dig**: the same 5 prompts for everyone each day, one try, shareable result.
- **Unlimited**: endless random prompts, from every pack or a single one. Free, no cap.

## Run it

```bash
npm install
npm run dev
```

## How scoring works

Each prompt in `src/lib/prompts.ts` lists its answers from most to least common. An answer's position sets its layer (Topsoil +1, Clay +2, Bedrock +4, Magma +7, Drillion +12). Matching in `src/lib/game.ts` accepts alternate spellings, plurals, and small typos.

Progress and stats live in localStorage. There's no backend yet.
