import { createInitialState } from './game/createInitialState.js';
import { startGame } from './game/startGame.js';
import { submitGuess } from './game/submitGuess.js';
import { countPossibleSecrets } from './game/countPossibleSecrets.js';
import { createDigitValidator } from './game/createDigitValidator.js';
import { isValidGuess } from './game/isValidGuess.js';
import type { GameBase } from './game/types.js';
import { addLeaderboardEntry } from './game/leaderboard.js';
import {
  loadLeaderboard,
  saveLeaderboard,
} from './storage/leaderboardStorage.js';

let state = createInitialState();
let leaderboard = loadLeaderboard();

const main = document.createElement('main');

const title = document.createElement('h1');
title.textContent = 'Bulls and Cows';

const description = document.createElement('p');
description.textContent = 'Угадай секретную комбинацию!';

const settingsTitle = document.createElement('h2');
settingsTitle.textContent = 'Настройки';

const baseLabel = document.createElement('label');
baseLabel.textContent = 'Система счисления: ';
baseLabel.htmlFor = 'base';

const baseSelect = document.createElement('select');
baseSelect.id = 'base';

const bases = [
  { value: 2, label: 'BIN (2)' },
  { value: 8, label: 'OCT (8)' },
  { value: 10, label: 'DEC (10)' },
  { value: 16, label: 'HEX (16)' },
];

bases.forEach((base) => {
  const option = document.createElement('option');
  option.value = String(base.value);
  option.textContent = base.label;
  baseSelect.append(option);
});

baseSelect.value = String(state.settings.base);

const lengthLabel = document.createElement('label');
lengthLabel.textContent = 'Длина комбинации: ';
lengthLabel.htmlFor = 'length';

const lengthSelect = document.createElement('select');
lengthSelect.id = 'length';

for (let length = 2; length <= 6; length++) {
  const option = document.createElement('option');
  option.value = String(length);
  option.textContent = String(length);
  lengthSelect.append(option);
}

lengthSelect.value = String(state.settings.length);

const combinationsInfo = document.createElement('p');

const startButton = document.createElement('button');
startButton.textContent = 'Начать игру';

const statusMessage = document.createElement('p');
statusMessage.setAttribute('role', 'status');

const gameSection = document.createElement('section');
gameSection.hidden = true;

const gameTitle = document.createElement('h2');
gameTitle.textContent = 'Угадай число';

const guessForm = document.createElement('form');

const guessLabel = document.createElement('label');
guessLabel.textContent = 'Введи комбинацию: ';
guessLabel.htmlFor = 'guess';

const guessInput = document.createElement('input');
guessInput.id = 'guess';
guessInput.type = 'text';
guessInput.autocomplete = 'off';
guessInput.spellcheck = false;

const guessButton = document.createElement('button');
guessButton.type = 'submit';
guessButton.textContent = 'Проверить';

guessForm.append(guessLabel, guessInput, guessButton);

const feedback = document.createElement('p');
feedback.setAttribute('role', 'status');

const historyTitle = document.createElement('h3');
historyTitle.textContent = 'История попыток';

const historyList = document.createElement('ol');

const winMessage = document.createElement('p');
winMessage.setAttribute('role', 'status');

gameSection.append(
  gameTitle,
  guessForm,
  feedback,
  historyTitle,
  historyList,
  winMessage,
);

const newGameButton = document.createElement('button');
newGameButton.textContent = 'Новая игра';
newGameButton.hidden = true;

const leaderboardSection = document.createElement('section');
const leaderboardTitle = document.createElement('h2');
leaderboardTitle.textContent = 'Таблица рекордов — топ 10';
const leaderboardList = document.createElement('ol');

main.className = 'app';

combinationsInfo.className = 'combinations-info';

statusMessage.className = 'status-message';

gameSection.className = 'game-panel';

feedback.className = 'feedback';

winMessage.className = 'win-message';

leaderboardSection.className = 'leaderboard-panel';

leaderboardSection.append(leaderboardTitle, leaderboardList);

function updateSettings(): void {
  const base = Number(baseSelect.value);

  Array.from(lengthSelect.options).forEach((option) => {
    option.disabled = Number(option.value) > base;
  });

  if (Number(lengthSelect.value) > base) {
    lengthSelect.value = '2';
  }

  const combinations = countPossibleSecrets(Number(lengthSelect.value), base);

  combinationsInfo.textContent = `Возможных комбинаций: ${combinations}`;
}

function render(): void {
  const hasStarted = state.status !== 'setup';
  const isPlaying = state.status === 'playing';

  baseSelect.disabled = hasStarted;
  lengthSelect.disabled = hasStarted;
  startButton.hidden = hasStarted;

  gameSection.hidden = !hasStarted;
  newGameButton.hidden = !hasStarted;

  guessInput.disabled = !isPlaying;
  guessButton.disabled = !isPlaying;
  guessInput.maxLength = state.settings.length;

  historyTitle.textContent = `История попыток (${state.history.length})`;

  historyList.replaceChildren();

  state.history.forEach((entry) => {
    const item = document.createElement('li');

    item.textContent = `${entry.guess} — Быки: ${entry.bulls}, коровы: ${entry.cows}`;

    historyList.append(item);
  });

  if (
    state.status === 'won' &&
    state.startedAt !== null &&
    state.finishedAt !== null
  ) {
    const seconds = Math.max(
      0,
      Math.floor((state.finishedAt - state.startedAt) / 1000),
    );

    winMessage.textContent =
      `Победа! Секрет: ${state.secret}. ` +
      `Попыток: ${state.history.length}. ` +
      `Время: ${seconds} сек.`;
  } else {
    winMessage.textContent = '';
  }

  statusMessage.textContent =
    state.status === 'setup'
      ? 'Выбери настройки и начни игру.'
      : state.status === 'playing'
        ? 'Игра идёт!'
        : 'Раунд завершён!';
}

function renderLeaderboard(): void {
  leaderboardList.replaceChildren();

  if (leaderboard.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'Пока нет рекордов.';
    leaderboardList.append(item);
    return;
  }

  leaderboard.forEach((record) => {
    const item = document.createElement('li');

    const baseNames = {
      2: 'BIN',
      8: 'OCT',
      10: 'DEC',
      16: 'HEX',
    };

    const baseName = baseNames[record.base];
    const seconds = (record.durationMs / 1000).toFixed(1);

    item.textContent =
      `${record.attempts} попыток, ${seconds} сек. — ` +
      `${baseName}, длина ${record.length}`;

    leaderboardList.append(item);
  });
}

baseSelect.addEventListener('change', updateSettings);
lengthSelect.addEventListener('change', updateSettings);

startButton.addEventListener('click', () => {
  const base = Number(baseSelect.value) as GameBase;
  const length = Number(lengthSelect.value);

  state = startGame(
    {
      ...state,
      settings: { length, base },
    },
    Date.now(),
    Math.random,
  );

  guessInput.value = '';
  feedback.textContent = '';

  render();
  guessInput.focus();
});

guessInput.addEventListener('input', () => {
  if (state.status !== 'playing') {
    return;
  }

  const isAllowedDigit = createDigitValidator(state.settings.base);

  guessInput.value = [...guessInput.value]
    .filter(isAllowedDigit)
    .slice(0, state.settings.length)
    .join('');

  feedback.textContent = '';
});

guessForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (state.status !== 'playing') {
    return;
  }

  const guess = guessInput.value.toLowerCase();

  if (!isValidGuess(guess, state.settings.length, state.settings.base)) {
    feedback.textContent =
      'Некорректная комбинация. Проверь длину и уникальность цифр.';
    return;
  }

  const isDuplicate = state.history.some(
    (entry) => entry.guess.toLowerCase() === guess,
  );

  if (isDuplicate) {
    feedback.textContent = 'Ты уже вводил эту комбинацию.';
    return;
  }

  const updatedState = submitGuess(state, guess, Date.now());

  if (updatedState === state) {
    feedback.textContent = 'Попытка не принята.';
    return;
  }

  state = updatedState;

  let recordSaved = true;

  if (
    state.status === 'won' &&
    state.startedAt !== null &&
    state.finishedAt !== null
  ) {
    const durationMs = Math.max(0, state.finishedAt - state.startedAt);

    leaderboard = addLeaderboardEntry(leaderboard, {
      length: state.settings.length,
      base: state.settings.base,
      attempts: state.history.length,
      durationMs,
    });

    recordSaved = saveLeaderboard(leaderboard);

    renderLeaderboard();
  }

  guessInput.value = '';
  feedback.textContent = state.status === 'playing' ? 'Попытка добавлена.' : '';

  render();

  if (!recordSaved) {
    feedback.textContent = 'Не удалось сохранить рекорд в браузере.';
  }

  if (state.status === 'playing') {
    guessInput.focus();
  }
});

newGameButton.addEventListener('click', () => {
  state = createInitialState();

  baseSelect.value = String(state.settings.base);
  lengthSelect.value = String(state.settings.length);

  guessInput.value = '';
  feedback.textContent = '';

  updateSettings();
  render();
});

main.append(
  title,
  description,
  settingsTitle,
  baseLabel,
  baseSelect,
  lengthLabel,
  lengthSelect,
  combinationsInfo,
  startButton,
  statusMessage,
  gameSection,
  newGameButton,
  leaderboardSection,
);

document.body.append(main);

updateSettings();
render();
renderLeaderboard();
