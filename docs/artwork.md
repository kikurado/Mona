# Generated artwork

All artwork was generated with the built-in image generation tool. The architecture uses generated scenes. The author supplied a face photograph as the identity reference for his illustrated piano performance. The approved concept is kept as `approved-concept.png` in this directory. Final website files are under `dist/assets/`.

## Palace entrance prompt

Use the approved top palace-door concept as a style reference. Create one photorealistic wide 16:9 frame with closed, rectangular, full-height double dark-walnut doors meeting at the exact center. Fine aged gilt and carved panels; no handles or center medallion, because the site supplies an interactive button. Keep the fixed stone jambs, bronze-gilt frame and warm sconces outside the central door area. Physically realistic grain, metal and candlelit shadow detail; no people, text, labels, fantasy particles or plastic rendering.

Output: `dist/assets/palace-door.png`.

## Theater prompt

Use the approved bottom theater concept as a style reference. Create one photorealistic wide 16:9 interior of the same old European opera house, from a first-person seat in the upper-right side balcony box looking down diagonally at the stage on the left. Curved gilt balconies, empty burgundy seats, chandelier, close burgundy velvet foreground rail. The stage has an uncluttered near-black backdrop with enough room for readable Arabic text, open dark-burgundy curtains, gilt proscenium, fringe pelmet and a softly lit wooden floor. Natural warm light and aged materials; no people, text, labels or fantasy decorations.

Output: `dist/assets/theater.png`.

## Curtain material prompt

Use the theater image as a color and material reference. Create one portrait, edge-to-edge, photorealistic deep burgundy wine-red velvet curtain texture. Natural full-height vertical pleats, warm subdued amber highlights and soft shadows. One opaque panel; no seam, tiebacks, frames, borders, stage, text or objects. Closely match the theater's velvet, with consistent side edges suitable for the animated curtain panels.

Output: `dist/assets/velvet.png`.

## Illustrated pianist prompt

Use case: illustration-story. Asset type: transparent animation sprite sheet for an elegant personal European theater website. Input image 1 is the exact likeness reference for the only man, not a background reference. Create a polished restrained hand-drawn doodle/watercolor-cutout of this adult man seated at a small black grand piano on a dark bench. Preserve his recognizable face, curly short dark hair, burgundy rectangular glasses, navy V-neck sweater over a pale blue striped shirt, gentle smile. No other people. Warm amber edge light, fine warm ivory ink contours and subtle softly painted shading; sophisticated intimate illustration, charming but adult, no oversized caricature head. The grand piano is glossy black with restrained gold details, realistic keys and open lid, legs and pedals. View the entire man, bench and entire grand piano from slightly above and the audience's front-right side, matching a balcony view down onto a stage. Man sits on the LEFT facing RIGHT towards keys; piano body extends RIGHT. The keyboard and hands must be visible. Composition MUST be a precisely aligned 2-by-2 animation sprite sheet, square overall, four equally sized SQUARE cells with no gutters, no separators, no frame borders, no labels. In EVERY cell the complete same man, piano and bench are wholly contained with generous empty transparent margins, identical camera, identical scale, identical piano coordinates, identical silhouette except specified tiny head/arm motion. Keep all four cells registered identically for a background-position animation. Top-left frame: man looks slightly toward the audience with a warm smile, hands poised quietly on keys. Top-right frame: head gently turned toward the keyboard, hands pressing keys, no large movement. Bottom-left frame: same seated pose and piano, slight alternate wrist and finger positions. Bottom-right frame: same seated pose and piano, another subtle alternate wrist and finger position. Each frame should feel almost identical, suitable for a slow gentle playing loop. Background: genuine alpha transparency everywhere outside the subject, including between legs; absolutely no checkerboard painted into image, no stage, no shadow rectangle, no scenery. No text, no watermark. High quality edges and consistent recognizable likeness.

Input: author's `gemini-clean-2026-08-29-165853.jpg`, used only as a likeness reference. The former output was `dist/assets/pianist-sprites.png`, RGBA, 1254 by 1254 pixels. Four equal cells retained the generated alpha channel. Source generation was built-in, with no image-editing scripts. The author subsequently requested removal; the sprite is no longer included in the deployed assets.
