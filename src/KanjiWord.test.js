import { render, screen, fireEvent } from '@testing-library/react';
import KanjiWord from './KanjiWord';
const entries = { 郵: { reading: '우편 우' }, 便: { reading: '편할 편' }, 考: { reading: '생각할 고/살필 고' }, 働: { meaning: '일하다; 노동하다.', note: '한국한자 훈음 미제공' } };

test('opens only the selected character, toggles and closes on outside click or Escape', () => {
  render(<KanjiWord word="郵便" entries={entries} />);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '郵 한자 뜻·음' }));
  expect(screen.getByRole('tooltip')).toHaveTextContent('우편 우');
  fireEvent.click(screen.getByRole('button', { name: '便 한자 뜻·음' }));
  expect(screen.getAllByRole('tooltip')).toHaveLength(1);
  expect(screen.getByRole('tooltip')).toHaveTextContent('편할 편');
  fireEvent.click(screen.getByRole('button', { name: '便 한자 뜻·음' }));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '郵 한자 뜻·음' }));
  fireEvent.pointerDown(document.body);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '郵 한자 뜻·음' }));
  fireEvent.keyDown(document, { key: 'Escape' });
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
});

test('leaves kana plain, closes when the word changes, and identifies missing Korean readings', () => {
  const { rerender } = render(<KanjiWord word="考える" entries={entries} />);
  expect(screen.getAllByRole('button')).toHaveLength(1);
  fireEvent.click(screen.getByRole('button', { name: '考 한자 뜻·음' }));
  expect(screen.getByRole('tooltip')).toHaveTextContent('생각할 고/살필 고');
  rerender(<KanjiWord word="働く" entries={entries} />);
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '働 한자 뜻·음' }));
  expect(screen.getByRole('tooltip')).toHaveTextContent('일하다; 노동하다.');
  expect(screen.getByRole('tooltip')).toHaveTextContent('한국한자 훈음 미제공');
});
