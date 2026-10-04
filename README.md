# ليلةٌ لكِ

An immersive palace entrance and theater presentation of the author's Arabic birthday poem. Built without framework dependencies.

## Preview

Run `node server.mjs` from this directory and open `http://127.0.0.1:4173`. All images, fonts, and audio are local. The supplied `Tom Odell - Another Love Piano cover.mp3` is preserved unchanged at `dist/assets/background-music.mp3`. After the doors and curtains open, the piano recording begins. Following a brief instrumental introduction, the poem appears on the empty stage. The music continues at a gentle background level and fades out after the poem. Web Audio controls volume, fades, and pause. Playback is unlocked silently on the door click for mobile browsers.

## Edit

After the palace doors open, «هٰذِهِ الْقَصِيدَةُ مُهْدَاةٌ لَكِ» fades in over the closed curtains, stays fully visible for four seconds, then fades out before the curtains part. This dedication uses the same typeface and stage margins as the poem. Pause and replay include this introduction.

The original poem and timing settings are in `dist/poem.js`. Each array entry is one original line, including the author's spelling and punctuation. Scene and control markup is in `dist/index.html`; styling is in `dist/styles.css`; interaction and playback are in `dist/app.js`; the music is in `dist/music.js`.

Each line stays fully visible for 4 seconds, with a 1.15-second fade on each side (6.3 seconds total). The final line remains for 14 seconds, then fades into the author's closing birthday message: «كل سنه و انتى طيبة يا بنت الاصول و كاملة الاوصاف». This message stays fully visible for seven seconds before fading. The curtains then close gently over 6.5 seconds as the music fades to silence. Reduced motion uses a three-second curtain fade. Pause, mute, and replay work throughout the ending; replay returns to the palace door.

The complete-poem reader pauses the performance and resumes it when closed if it was previously playing. Changing tabs pauses the experience until the visitor resumes. The bottom replay button, «أعيدي العرض من البداية», addresses the recipient directly and is available throughout the performance. It stops and rewinds the music, clears the poem, and returns to the closed palace door with focus on its opening button. The visitor opens the door again to restart the whole experience. The visitor's mute preference is preserved. Reduced-motion preferences use fades instead of camera and door movement.

The stage remains clear throughout the performance. At the author's request, the voice greeting and illustrated pianist have been removed from the deployed assets. The poem is anchored inside the theater artwork, in a narrower area with margins from the curtains.

## Artwork and type

Built-in image generation created the approved concept and three production assets. The prompts and provenance are documented in `docs/artwork.md`. Amiri is self-hosted under its included SIL Open Font License in `dist/assets/Amiri-OFL.txt`.

## Upload to GitHub

Extract the archive and upload the contents of the `a-night-for-you` folder to a private repository named `a-night-for-you`. Keep the `dist` and `docs` folders intact alongside `README.md`, `server.mjs`, and `.gitignore`.

## Hosting

The complete static website is in `dist/`. A static hosting service can serve that directory directly. The local preview server requires Node.js and has no package dependencies. Repository privacy and website visitor access are configured separately by the chosen hosting service.
