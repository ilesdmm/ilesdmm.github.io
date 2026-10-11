import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const html = readFileSync('out/index.html', 'utf8');
test('public portfolio keeps its navigation targets and gallery assets', () => {
  for (const id of ['top', 'work', 'build', 'capabilities', 'contact']) assert.ok(html.includes(`id="${id}"`), id);
  for (const match of html.matchAll(/src="(\/ui-gfx\/[^"?]+)"/g)) assert.ok(existsSync(`out${match[1]}`), match[1]);
  assert.ok(html.includes('https://discord.com/app'));
});
test('twelve featured previews and sixteen systems are rendered', () => {
  assert.ok(html.includes('AI AGGRO &amp; ZONE DETECTION SYSTEM'));
  assert.ok(html.includes('ROUND &amp; ROLE SYSTEM'));
  assert.ok(!html.includes('Player Movement System'));
  assert.ok(html.includes('Dynamic Movement System'));
  assert.equal((html.match(/class="project project-dark"/g) || []).length, 12);
  assert.ok(html.replaceAll('<!-- -->', '').includes('More systems / 13—16'));
  const source = readFileSync('app/portfolio-projects.ts', 'utf8');
  for (const id of ['xkzckJU9c6g', 'h4Un0kK6uOg', 'rhJFSWRuO5E', 'ERt8fXCf24Q']) assert.ok(source.includes(id));
  for (const id of ['ke1Bhn0ZGGc', 'xcOu7b0e5jM', 'coa5FW_ExA8']) assert.ok(!source.includes(id));
});
test('current claims and testimonials stay accurate', () => {
  assert.ok(html.includes('$8,200'));
  assert.ok(html.includes('<strong>31</strong>'));
  assert.ok(html.includes('Past 2 weeks'));
  assert.ok(html.includes('This month'));
  assert.ok(!html.includes('id="testimonials-title"'));
  assert.ok(html.includes('4+'));
  assert.ok(html.includes('16+ Hrs/Day'));
});
