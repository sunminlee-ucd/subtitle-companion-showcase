const { parseSrt, activeCueIndices } = require('./subtitle-core.cjs');
const cues = parseSrt('1\n00:00:01,000 --> 00:00:03,000\nHello, world.\n\n2\n00:00:03,000 --> 00:00:05,000\nA synthetic study cue.');
console.log('Subtitle cue engine — synthetic input, no streaming connection');
for (const [time, offset] of [[2, 0], [3, 0], [3, 1], [6, 0]]) {
  const active = activeCueIndices(cues, time, offset).map(i => cues[i].text);
  console.log(JSON.stringify({ videoTime: time, offset, active }));
}
