const { test } = require('node:test');
const assert = require('node:assert/strict');
const { parseSrt, activeCueIndices, playbackBounds, pageVideoIdentity } = require('./subtitle-core.cjs');

test('BOM/CRLF input keeps multiline text and fractional cue timing', () => {
  const cues = parseSrt('\uFEFF1\r\n00:00:01,250 --> 00:00:02,500\r\nHello\r\nworld\r\n');
  assert.deepEqual(cues, [{ start: 1.25, end: 2.5, text: 'Hello\nworld' }]);
});

test('invalid intervals are excluded without discarding valid cues', () => {
  const cues = parseSrt('1\n00:00:03,000 --> 00:00:02,000\nInvalid\n\n2\n00:00:04,000 --> 00:00:05,000\nValid');
  assert.deepEqual(cues, [{ start: 4, end: 5, text: 'Valid' }]);
  assert.throws(() => parseSrt('no valid timestamps'), /No valid subtitle/);
});

test('overlapping cues remain active and offset is applied at half-open boundaries', () => {
  const cues = [{ start: 1, end: 3, text: 'A' }, { start: 2, end: 4, text: 'B' }];
  assert.deepEqual(activeCueIndices(cues, 2.5), [0, 1]);
  assert.deepEqual(activeCueIndices(cues, 3), [1]);
  assert.deepEqual(activeCueIndices(cues, 4, 1), [1]);
  assert.deepEqual(activeCueIndices(cues, 5, 1), []);
});

test('negative-offset playback cannot seek before zero', () => {
  assert.deepEqual(playbackBounds({ start: 0.2, end: 0.3 }, -1), { start: 0, end: 0.05 });
});

test('supported watch URLs identify videos independently of irrelevant query values', () => {
  assert.deepEqual(pageVideoIdentity('https://www.netflix.com/watch/123?track=demo'), { provider: 'netflix', key: '123' });
  assert.deepEqual(pageVideoIdentity('https://www.youtube.com/watch?v=demo-id&t=20'), { provider: 'youtube', key: 'demo-id' });
});
