import fs from 'fs';
import path from 'path';
import entries from './data/kanji.json';
import pending from './data/kanji-pending.json';

test('every kanji in all Japanese textbooks has a sourced result or an explicit pending status', () => {
  const folders = ['japanese', 'hackers_n3', 'darakwon_n3', 'darakwon_n4', 'joayo'].map(category => path.join(process.cwd(), 'public', category));
  const characters = new Set();
  for (const folder of folders) {
  for (const name of fs.readdirSync(folder).filter(name => name.endsWith('.txt'))) {
    for (const line of fs.readFileSync(path.join(folder, name), 'utf8').split(/\r?\n/)) {
      const word = line.split('\t')[1] || '';
      for (const char of word.match(/[\u3400-\u9fff\uf900-\ufaff]/gu) || []) characters.add(char);
    }
  }
  }
  expect(characters.size).toBeGreaterThan(900);
  for (const char of characters) {
    if (!entries[char]) {
      expect(pending).toContain(char);
      continue;
    }
    const entry = entries[char];
    expect(entry.sourceUrl).toMatch(/^https:\/\/ja\.dict\.naver\.com\/#\/(entry\/jako\/|search\?)/);
    if (entry.status === 'verified') {
      expect(entry.reading).toMatch(/[가-힣]/);
      expect(entry.koreanHanja).toBeTruthy();
    } else {
      expect(entry.reading).toBeNull();
      expect(entry.note).toBeTruthy();
    }
  }
});
