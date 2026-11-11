import { render, screen, fireEvent } from '@testing-library/react';
import JAPANESEQuiz from './JAPANESEQuiz';
import KANJIQuiz from './KANJIQuiz';
import TOEICQuiz from './TOEICQuiz';
import JOAYOQuiz from './JOAYOQuiz';
import HACKERS_N3 from './HACKERS_N3';
import DARAKWON_N3 from './DARAKWON_N3';
import DARAKWON_N4 from './DARAKWON_N4';

const cases = [
  ['japanese', JAPANESEQuiz, false], ['kanji', KANJIQuiz, true],
  ['toeic', TOEICQuiz, true], ['joayo', JOAYOQuiz, false],
  ['hackers_n3', HACKERS_N3, false], ['darakwon_n3', DARAKWON_N3, false],
  ['darakwon_n4', DARAKWON_N4, false],
];
afterEach(() => jest.restoreAllMocks());
test.each(cases)('%s preserves reveal, advance, restart and back navigation', async (category, Quiz, simple) => {
  const text = simple ? 'word1\t뜻1\nword2\t뜻2' : '1\tword1\t읽기1\t뜻1\n2\tword2\t읽기2\t뜻2';
  jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, text: async () => text });
  const onBack = jest.fn();
  render(<Quiz category={category} fileName="sample.txt" onBack={onBack} />);
  fireEvent.click(await screen.findByRole('button', { name: '정답 확인', exact: true }));
  expect(screen.getByText(/^뜻[12]$/)).toBeInTheDocument();
  if (!simple) expect(screen.getByText(/^읽기[12]$/)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '다음 단어', exact: true }));
  expect(screen.queryByText(/^뜻[12]$/)).not.toBeInTheDocument();
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '2');
  fireEvent.click(screen.getByRole('button', { name: '정답 확인', exact: true }));
  expect(screen.getByRole('button', { name: '재시작', exact: true })).toHaveClass('jq-action-restart');
  fireEvent.click(screen.getByRole('button', { name: '재시작', exact: true }));
  expect(screen.getByRole('button', { name: '정답 확인', exact: true })).not.toHaveClass('jq-action-restart');
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  expect(screen.queryByText(/^뜻[12]$/)).not.toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /단어장 목록/ }));
  expect(onBack).toHaveBeenCalledTimes(1);
});


test.each(cases.filter(([, , simple]) => !simple))('%s supports kanji clicks without advancing the card', async (category, Quiz) => {
  jest.spyOn(Math, 'random').mockReturnValue(0.99);
  jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, text: async () => '1\t好きだ\tすきだ\t좋아하다\n2\t考える\tかんがえる\t생각하다' });
  render(<Quiz category={category} fileName="sample.txt" onBack={() => {}} />);
  const character = await screen.findByRole('button', { name: '好 한자 뜻·음' });
  fireEvent.click(character);
  expect(screen.getByRole('tooltip')).toHaveTextContent('좋을 호');
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  fireEvent.keyDown(character, { key: 'Enter' });
  expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1');
  fireEvent.click(screen.getByRole('button', { name: '정답 확인', exact: true }));
  expect(screen.getByText('좋아하다')).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: '다음 단어', exact: true }));
  expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: '考 한자 뜻·음' })).toBeInTheDocument();
});
