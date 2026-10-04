# A private birthday performance

Approved visual direction on October 4, 2026: the generated walnut-and-gold palace entrance and burgundy European theater concept. The recipient's view is from the upper-right balcony box, looking down toward the stage. Aesthetics are the primary requirement.

## Experience

1. Full-screen palace entrance with one central, accessible gold door button.
2. The click opens the two door leaves. The view advances into the theater while silently unlocking music playback for mobile browsers.
3. The fully vowelled dedication, «هٰذِهِ الْقَصِيدَةُ مُهْدَاةٌ لَكِ», fades in over the closed velvet curtains and stays fully visible for four seconds. It fades away before the curtains part, revealing an empty stage. The selected piano recording begins once the curtains open. Following a 2.8-second instrumental introduction, the Arabic poem appears one original line at a time with preserved diacritics and wording. Each normal line has a four-second fully visible hold. The author requested removal of his voice greeting and illustrated pianist; those assets are excluded from the deployed site.
4. Each line gets a readable hold, followed by a restrained fade. The last line lingers, then fades into «كل سنه و انتى طيبة يا بنت الاصول و كاملة الاوصاف». The greeting stays fully visible for seven seconds, then fades away. The curtains close over 6.5 seconds while the music fades to silence, both following the paused timeline. Reduced motion uses a three-second curtain fade. The bottom replay button, «أعيدي العرض من البداية», addresses her directly, stops the music and returns to the closed palace door, ready for another complete entrance. Pause, mute, and the complete poem are available through discreet controls, including during the ending.

## Composition review, October 4

The previous illustration occupied 43% of the stage opening and drew attention throughout the poem. Its moving hands, portrait and gilded piano competed with the Arabic words. A smaller introduction at 28% was tried, then the author requested its complete removal along with the voice greeting. The stage now remains clear throughout the experience, focusing on the poem.

The previous text block was positioned against the viewport, with screen-specific offsets. Its position could drift relative to the curtain edges and fill the stage too tightly. The poem now sits inside the theater artwork itself, in a 25%-wide inset region from 28% to 53% of the artwork width. Its type scales with that artwork. Portrait crops center this region, keeping the poem and its margins visible on phone and tablet screens. Short landscape screens use a slightly wider 29% region and smaller type so longer Arabic lines fit comfortably.

## Implementation

Buildless HTML, CSS, and JavaScript with generated architectural artwork, locally hosted open-source Arabic fonts, and supplied MP3 piano cover. A native audio element plays the unchanged recording through Web Audio for volume and smooth fades. Scene transitions use composited image layers and CSS transforms. The poem is a separate data file. The timeline and recording pause when the tab is hidden. Reduced motion replaces camera and door movement with simple fades. Small screens retain the stage and poem without horizontal scrolling.

## Boundaries

Preserve the supplied poem exactly; do not correct its spelling or add lines. No recipient account is configured yet. Initial hosting is owner-private for the user's review; recipient access needs the user's chosen sharing details. Do not send invitations or change audience automatically.

## Validation

Verify entrance, repeated clicks, transition, curtain reveal, line sequence, pause/resume, replay, mute, complete-poem view, keyboard access, and narrow-screen readability. Confirm no console errors or missing assets. Confirm the hosting deployment result if publishing succeeds.

## Implementation plan

Prepare standalone artwork and font assets. Build the scene and timeline, integrate all supplied lines and original audio, inspect desktop and phone previews, fix observed failures, and publish the tested owner-private preview.
