export function createTimeline(lines, configuration, startMilliseconds) {
  let cursor = startMilliseconds;
  const verses = lines.map((text, index) => {
    const duration = index === lines.length - 1 ? configuration.finalHoldMilliseconds :
      configuration.visibleLineMilliseconds + 2 * configuration.fadeMilliseconds;
    const verse = {text, index, start: cursor, end: cursor + duration};
    cursor += duration;
    return verse;
  });
  return { verses, start: startMilliseconds, end: cursor };
}

export function verseAt(timeline, elapsed) {
  if (elapsed < timeline.start) return null;
  return timeline.verses.find(verse => elapsed < verse.end) ?? timeline.verses.at(-1);
}

export function verseOpacity(verse, elapsed, fadeMilliseconds, isLast) {
  if (!verse) return 0;
  const incoming = Math.min(1, Math.max(0, (elapsed - verse.start) / fadeMilliseconds));
  const outgoing = isLast ? 1 : Math.min(1, Math.max(0, (verse.end - elapsed) / fadeMilliseconds));
  return Math.min(incoming, outgoing);
}
