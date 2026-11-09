import {
  cpSync,
  mkdirSync,
  rmSync,
  readFileSync,
  writeFileSync,
} from 'node:fs';

const output = 'pages-build';

rmSync(output, { recursive: true, force: true });
mkdirSync(output, { recursive: true });

const html = readFileSync('index.html', 'utf8');

writeFileSync(
  `${output}/index.html`,
  html.replace('./dist/main.js', './assets/main.js'),
);

cpSync('style.css', `${output}/style.css`);
cpSync('dist', `${output}/assets`, { recursive: true });
